import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { DatabaseRoutine } from 'src/domain/backup/enterprise/entities/database-routines';
import { IDatabaseRepository } from 'src/domain/backup/enterprise/repositories/database-repository';
import { IDatabaseRoutineRepository } from 'src/domain/backup/enterprise/repositories/database-routines-repository';

interface Request {
  id_database: string;
  execution_time: Date;
}

type CreateDatabaseRoutineResponse = Either<
  ResourceAlreadyExistsError,
  {
    database_routine: DatabaseRoutine;
  }
>;

@Injectable()
export class CreateDatabaseRoutineUseCase {
  constructor(
    private readonly databaseRoutineRepository: IDatabaseRoutineRepository,
    private readonly databaseRepository: IDatabaseRepository,
  ) {}
  async execute(request: Request): Promise<CreateDatabaseRoutineResponse> {
    const databaseExists = await this.databaseRepository.findById(
      request.id_database,
    );

    if (!databaseExists) {
      return left(new ResourceAlreadyExistsError('Database not found'));
    }

    const databaseRoutines =
      await this.databaseRoutineRepository.findRoutinesByDatabase(
        request.id_database,
      );

    if (databaseRoutines.length >= databaseExists.routines) {
      return left(
        new ResourceAlreadyExistsError('Cannot create more routines'),
      );
    }
    const databaseRoutine = DatabaseRoutine.create(
      {
        id_user: databaseExists.id_user,
        id_database: new UniqueEntityID(request.id_database),
        active: false,
        created_at: new Date(),
        execution_time: request.execution_time,
      },
      new UniqueEntityID(),
    );
    const res = await this.databaseRoutineRepository.create(databaseRoutine);

    if (res) {
      return right({
        database_routine: res,
      });
    }
  }
}
