import { Database } from 'src/domain/backup/enterprise/entities/database';

export class DatabasePresenter {
  static toHTTP(database: Database) {
    return {
      id_database: database.id.toString(),
      id_user: database.id_user.toString(),
      database_description: database.database_description,
      database_name: database.database_name,
      database_type: database.database_type,
      server_name: database.server_name,
      host: database.host,
      port: database.port,
      created_at: database.created_at,
      observation: database.observation,
      routines: database.routines,
      retentions: database.retentions,
      status: database.status,
      id_project: database.id_project,
    };
  }
}
