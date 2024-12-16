import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { InternalServerError } from 'src/core/errors/internal-server-error';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { Database } from 'src/domain/backup/enterprise/entities/database';
import { IDatabaseRepository } from 'src/domain/backup/enterprise/repositories/database-repository';

interface getDatabaseRequest {
  id_database: string;
}

type ListRoutinesResponse = Either<
  ResourceAlreadyExistsError | InternalServerError,
  {
    database: Database;
  }
>;

@Injectable()
export class GetDatabaseByIdUseCase {
  constructor(private readonly databaseRoutines: IDatabaseRepository) {}
  async execute({
    id_database,
  }: getDatabaseRequest): Promise<ListRoutinesResponse> {
    const database = await this.databaseRoutines.findById(id_database);

    if (!database) {
      return left(new ResourceNotFoundError('Database not found'));
    }

    return right({
      database: database,
    });
  }
}
