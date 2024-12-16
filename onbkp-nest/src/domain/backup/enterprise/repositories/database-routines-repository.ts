import { DatabaseRoutine } from '../entities/database-routines';

export abstract class IDatabaseRoutineRepository {
  abstract create(database_routine: DatabaseRoutine): Promise<DatabaseRoutine>;
  abstract update(
    database_routine: DatabaseRoutine,
  ): Promise<DatabaseRoutine | void>;
  abstract findById(
    id_database: string,
    id_database_routine: string,
  ): Promise<DatabaseRoutine | null>;
  abstract findRoutinesByDatabase(
    id_database: string,
  ): Promise<DatabaseRoutine[] | null>;
}
