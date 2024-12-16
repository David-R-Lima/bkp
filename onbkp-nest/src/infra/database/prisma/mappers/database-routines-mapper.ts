import {
  Prisma,
  database_routines as PrismaDataBaseRoutines,
  executed_routines as PrismaExecutedRoutines,
} from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { DatabaseRoutine } from 'src/domain/backup/enterprise/entities/database-routines';
import { ExecutedRoutinesMapper } from './executed-routines-mapper';

export class DatabaseRoutineMapper {
  static toDomain(
    databaseRoutine: PrismaDataBaseRoutines & {
      executedRoutines?: PrismaExecutedRoutines[];
    },
  ) {
    return DatabaseRoutine.create(
      {
        id_database: new UniqueEntityID(databaseRoutine.id_database ?? ''),
        id_user: new UniqueEntityID(databaseRoutine.id_user),
        execution_time: databaseRoutine.execution_time,
        observation: databaseRoutine.observation,
        created_at: databaseRoutine.created_at,
        active: databaseRoutine.active,
        executed_routines: databaseRoutine?.executedRoutines
          ? databaseRoutine.executedRoutines.map(
              ExecutedRoutinesMapper.toDomain,
            )
          : undefined,
      },
      new UniqueEntityID(databaseRoutine.id_routine),
    );
  }
  static toPrisma(
    databaseRoutine: DatabaseRoutine,
  ): Prisma.database_routinesUncheckedCreateInput {
    return {
      id_database: databaseRoutine.id_database.toString(),
      id_routine: databaseRoutine.id.toString(),
      id_user: databaseRoutine.id_user.toString(),
      execution_time: databaseRoutine.execution_time,
      observation: databaseRoutine.observation,
      active: databaseRoutine.active,
      created_at: databaseRoutine.created_at,
    };
  }
}
