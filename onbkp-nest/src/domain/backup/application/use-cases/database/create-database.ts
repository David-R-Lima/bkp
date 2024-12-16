import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { Database } from 'src/domain/backup/enterprise/entities/database';
import { IDatabaseRepository } from 'src/domain/backup/enterprise/repositories/database-repository';
import { DatabaseType } from 'src/domain/backup/enums/databaseType';

interface Request {
  id_user: string;
  server: string;
  host: string;
  port: number;
  database_name: string;
  database_type: DatabaseType;
  database_user: string;
  database_password: string;
  database_description: string;
  database_collection?: string;
  id_project: string;
}

type CreateDatabaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    database: Database;
  }
>;

@Injectable()
export class CreateDatabaseUseCase {
  constructor(private readonly databaseRepository: IDatabaseRepository) {}
  async execute(request: Request): Promise<CreateDatabaseResponse> {
    const database = Database.create(
      {
        id_user: new UniqueEntityID(request.id_user),
        server_name: request.server,
        host: request.host,
        port: request.port,
        database_description: request.database_description,
        database_name: request.database_name,
        database_type: request.database_type as DatabaseType,
        database_user: request.database_user,
        database_password: request.database_password,
        database_collection: request.database_collection
          ? request.database_collection
          : null,
        created_at: new Date(),
        routines: 5,
        retentions: 5,
        status: 'A',
        id_project: request.id_project,
      },
      new UniqueEntityID(),
    );
    const res = await this.databaseRepository.create(database);

    if (res) {
      return right({
        database: res,
      });
    }
  }
}
