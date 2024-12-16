import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { InternalServerError } from 'src/core/errors/internal-server-error';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { IDatabaseRepository } from 'src/domain/backup/enterprise/repositories/database-repository';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { IDatabaseRoutineRepository } from 'src/domain/backup/enterprise/repositories/database-routines-repository';

type BackupDatabaseResponse = Either<
  ResourceAlreadyExistsError | InternalServerError,
  null
>;

@Injectable()
export class ScheduleBackupUseCase {
  constructor(
    private readonly databaseRepository: IDatabaseRepository,
    private readonly databaseRoutines: IDatabaseRoutineRepository,
    @InjectQueue('backup') protected backupQueue: Queue,
  ) {}
  async execute(
    id_database: string,
    id_routine: string,
  ): Promise<BackupDatabaseResponse> {
    const res = await this.databaseRepository.findById(id_database);

    if (!res) {
      return left(new ResourceNotFoundError('Database not found'));
    }

    const routine = await this.databaseRoutines.findById(
      id_database,
      id_routine,
    );

    if (!routine) {
      return left(new ResourceNotFoundError('Routine not found'));
    }

    routine.active = true;

    const job: Partial<Job<{ id_database: string; id_routine: string }>> = {
      data: { id_database, id_routine: routine.id.toString() },
    };

    const hour = routine.execution_time.getHours();
    const minute = routine.execution_time.getMinutes();

    // this.backupQueue.add('schedule-backup', job.data, {
    //   jobId: routine.id.toString(),
    //   repeat: {
    //     // every: 1000 * 60 * 60 * 24,
    //     every: 10000,
    //   },
    // });

    this.backupQueue.add('schedule-backup', job.data, {
      jobId: routine.id.toString(),
      repeat: {
        // every: 1000 * 60 * 60 * 24,
        cron: `${minute} ${hour} * * *`,
      },
    });

    await this.databaseRoutines.update(routine);

    return right(null);
  }
}
