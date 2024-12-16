import { DatabaseRoutine } from 'src/domain/backup/enterprise/entities/database-routines';

export class DatabaseRoutinePresenter {
  static toHTTP(databaseRoutine: DatabaseRoutine) {
    return {
      id_database_routine: databaseRoutine.id.toString(),
      id_database: databaseRoutine.id_database.toString(),
      execution_time: databaseRoutine.execution_time,
      observation: databaseRoutine.observation,
      created_at: databaseRoutine.created_at,
      active: databaseRoutine.active,
    };
  }
}
