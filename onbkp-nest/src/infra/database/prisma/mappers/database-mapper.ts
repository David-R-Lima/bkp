import { Prisma, database as PrismaDatabase } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Database } from 'src/domain/backup/enterprise/entities/database';
import { DatabaseType } from 'src/domain/backup/enums/databaseType';

export class DatabaseMapper {
  static toDomain(database: PrismaDatabase) {
    return Database.create(
      {
        id_user: new UniqueEntityID(database.id_user),
        database_description: database.database_description,
        database_name: database.database_name,
        database_type: database.database_type as DatabaseType,
        server_name: database.server_name,
        host: database.host,
        port: database.port,
        database_collection: database.database_colection,
        database_user: database.database_user,
        database_password: database.database_password,
        created_at: database.created_at,
        observation: database.observation,
        routines: database.routines,
        retentions: database.retentions,
        status: database.status,
        id_project: database.id_project,
      },
      new UniqueEntityID(database.id_database),
    );
  }
  static toPrisma(database: Database): Prisma.databaseUncheckedCreateInput {
    return {
      id_database: database.id.toString(),
      id_user: database.id_user.toString(),
      database_description: database.database_description,
      database_name: database.database_name,
      database_type: database.database_type,
      server_name: database.server_name,
      host: database.host,
      port: database.port,
      database_colection: database.database_collection,
      database_user: database.database_user,
      database_password: database.database_password,
      created_at: database.created_at,
      observation: database.observation,
      routines: database.routines,
      retentions: database.retentions,
      status: database.status,
      id_project: database.id_project,
    };
  }
}
