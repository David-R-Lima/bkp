import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { left } from 'src/core/either';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { IDatabaseRepository } from 'src/domain/backup/enterprise/repositories/database-repository';
import { BackupFactoryImpl } from 'src/infra/services/backup/impl/backup';
import { IExecutedRoutinesRepository } from 'src/domain/backup/enterprise/repositories/executed-routine-repository';
import { ExecutedRoutines } from 'src/domain/backup/enterprise/entities/executed-routines';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { createGzip } from 'zlib';
import * as fs from 'node:fs';
import { IDatabaseRoutineRepository } from 'src/domain/backup/enterprise/repositories/database-routines-repository';
import { DatabaseType } from 'src/domain/backup/enums/databaseType';
import { NotificationType } from 'src/domain/backup/enterprise/entities/database-notification';
import { UploaderServiceFactory } from 'src/domain/backup/application/storage/uploader-factory';
import { UploadType } from 'src/domain/backup/enterprise/entities/upload-options';

@Processor('backup')
export class BackupProcessor {
  constructor(
    private uploader: UploaderServiceFactory,
    private databaseRepository: IDatabaseRepository,
    private executedRoutinesRepository: IExecutedRoutinesRepository,
    private databaseRoutinesRepository: IDatabaseRoutineRepository,
    private backupFactoryImpl: BackupFactoryImpl,
    @InjectQueue('notifications') protected notificationQueue: Queue,
  ) {}
  @Process('schedule-backup')
  async execute({ data }: Job<{ id_database: string; id_routine: string }>) {
    const res = await this.databaseRepository.findById(data.id_database);

    if (!res) {
      return left(new ResourceNotFoundError('Database not found'));
    }

    const routineExists = await this.databaseRoutinesRepository.findById(
      data.id_database,
      data.id_routine,
    );

    if (!routineExists) {
      return left(new ResourceNotFoundError('Routine not found'));
    }

    const executedRoutines =
      await this.executedRoutinesRepository.findRoutinesByDatabase(
        data.id_database,
      );

    const uploader = this.uploader.getService(UploadType.s3);

    if (executedRoutines.length >= res.retentions) {
      const temp = executedRoutines[executedRoutines.length - 1];
      temp.deleted = true;
      temp.situation = 'D';

      try {
        if (temp.file_name) {
          await uploader.delete(temp.file_name);

          temp.file_name = null;

          await this.executedRoutinesRepository.update(temp);
        } else {
          throw new Error('no file name');
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }

    const executed_routine = ExecutedRoutines.create(
      {
        id_routine: routineExists.id,
        situation: 'A',
        time_to_start: new Date(),
        created_at: new Date(),
        deleted: false,
      },
      new UniqueEntityID(),
    );

    const service = this.backupFactoryImpl.getService(res.database_type);

    const now = new Date();

    const pad = (num) => String(num).padStart(2, '0');

    executed_routine.start_backup = new Date();
    const shortUuid = data.id_routine.split('-')[0];

    const fileName = `${res.database_name}-${shortUuid}-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

    const backupResult = await service.execute({
      server: res.server_name,
      database: res.database_name,
      user: res.database_user,
      password: res.database_password,
      host: res.host,
      port: res.port,
      file: fileName,
    });

    if (!backupResult) {
      console.log('Failed to backup database: ' + res.id.toString());

      this.notificationQueue.add('schedule-notification', {
        id_user: res.id_user.toString(),
        types: [NotificationType.ERRO_BACKUP],
        database: res.database_description,
      });

      return;
    }

    executed_routine.end_backup = new Date();

    executed_routine.start_compression = new Date();

    let buffer: Buffer;

    try {
      await compressFileToBuffer(
        fileName,
        res.database_type,
        res.database_name,
        res.database_collection,
      ).then((b: Buffer) => {
        buffer = b;
      });
    } catch (error) {
      console.log(error);
    }

    executed_routine.file_size = buffer.length;

    executed_routine.end_compression = new Date();

    executed_routine.start_send_cloud = new Date();

    try {
      await uploader.upload({
        file: buffer,
        fileName: fileName,
        fileType: 'gz',
      });
    } catch (error) {
      console.log('error: ', 'upload error');

      this.notificationQueue.add('schedule-notification', {
        id_user: res.id_user.toString(),
        types: [NotificationType.ERRO_SALVAR_BACKUP],
        database: res.database_description,
      });
    }

    executed_routine.end_send_cloud = new Date();

    if (res.database_type === DatabaseType.MONGO) {
      fs.rm('temp/' + fileName, { recursive: true, force: true }, () => {});
    } else {
      fs.rm('temp/' + fileName + '.sql', () => {});
    }

    executed_routine.file_name = fileName;

    await this.executedRoutinesRepository.create(executed_routine);

    console.log('Backed up database: ' + data.id_database);
    console.log('Job id: ' + data.id_routine);

    this.notificationQueue.add('schedule-notification', {
      id_user: res.id_user.toString(),
      types: [NotificationType.SUCESSO_BACKUP],
      database: res.database_description,
    });
  }
}

async function compressFileToBuffer(
  fileName: string,
  databaseType: DatabaseType,
  databaseName: string,
  collection?: string,
) {
  return new Promise((resolve, reject) => {
    let fileContents;
    if (databaseType === DatabaseType.MONGO) {
      fileContents = fs.createReadStream(
        'temp/' + fileName + '/' + databaseName + '/' + collection + '.bson',
      );
    } else {
      fileContents = fs.createReadStream('temp/' + fileName + '.sql');
    }
    const gzip = createGzip();
    const chunks = [];

    fileContents.on('error', (err) => {
      console.error('Error in reading file:', err);
      reject(err);
    });

    gzip.on('error', (err) => {
      console.error('Error in gzipping file:', err);
      reject(err);
    });

    gzip.on('data', (chunk) => chunks.push(chunk));
    gzip.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    fileContents.pipe(gzip);
  });
}
