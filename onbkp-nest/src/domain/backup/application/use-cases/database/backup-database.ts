import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { InternalServerError } from 'src/core/errors/internal-server-error';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { IDatabaseRepository } from 'src/domain/backup/enterprise/repositories/database-repository';
import { DatabaseType } from 'src/domain/backup/enums/databaseType';
import { BackupServiceFactory } from '../../services/providers/backup-service-factory';

type BackupDatabaseResponse = Either<
  ResourceAlreadyExistsError | InternalServerError,
  null
>;

@Injectable()
export class BackupDatabaseUseCase {
  constructor(
    private readonly databaseRepository: IDatabaseRepository,
    private readonly backupServiceFactory: BackupServiceFactory,
  ) {}
  async execute(id_database: string): Promise<BackupDatabaseResponse> {
    const res = await this.databaseRepository.findById(id_database);

    if (!res) {
      return left(new ResourceNotFoundError('Database not found'));
    }

    const service = this.backupServiceFactory.getService(
      res.database_type as DatabaseType,
    );

    const backup = await service.execute({
      server: res.server_name,
      database: res.database_name,
      user: res.database_user,
      password: res.database_password,
      host: res.host,
      port: res.port,
      file: 'temp.sql',
    });

    if (backup) {
      return right(null);
    } else {
      return left(new InternalServerError('Error executing'));
    }
  }
}
