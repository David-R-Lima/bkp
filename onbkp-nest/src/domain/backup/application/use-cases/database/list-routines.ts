import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { InternalServerError } from 'src/core/errors/internal-server-error';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { InjectQueue } from '@nestjs/bull';
import { IDatabaseRoutineRepository } from 'src/domain/backup/enterprise/repositories/database-routines-repository';
import { Queue } from 'bull';
import { DatabaseRoutine } from 'src/domain/backup/enterprise/entities/database-routines';

type ListRoutinesResponse = Either<
  ResourceAlreadyExistsError | InternalServerError,
  { routines: DatabaseRoutine[] }
>;

@Injectable()
export class ListRoutinesUseCase {
  constructor(
    private readonly databaseRoutines: IDatabaseRoutineRepository,
    @InjectQueue('backup') protected backupQueue: Queue,
  ) {}
  async execute(id_database: string): Promise<ListRoutinesResponse> {
    const routines =
      await this.databaseRoutines.findRoutinesByDatabase(id_database);

    return right({
      routines,
    });
  }
}
