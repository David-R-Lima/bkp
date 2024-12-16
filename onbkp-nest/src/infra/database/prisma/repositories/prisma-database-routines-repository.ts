import { DatabaseRoutine } from 'src/domain/backup/enterprise/entities/database-routines';
import { IDatabaseRoutineRepository } from 'src/domain/backup/enterprise/repositories/database-routines-repository';
import { DatabaseRoutineMapper } from '../mappers/database-routines-mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaDatabaseRoutinesRepository
  implements IDatabaseRoutineRepository
{
  constructor(private prisma: PrismaService) {}

  async create(
    databaseRoutine: DatabaseRoutine,
  ): Promise<DatabaseRoutine | null> {
    const data = DatabaseRoutineMapper.toPrisma(databaseRoutine);

    try {
      const res = await this.prisma.database_routines.create({
        data,
      });

      return DatabaseRoutineMapper.toDomain(res);
    } catch (error) {
      return null;
    }
  }

  async update(
    databaseRoutine: DatabaseRoutine,
  ): Promise<DatabaseRoutine | void> {
    const data = DatabaseRoutineMapper.toPrisma(databaseRoutine);

    try {
      await this.prisma.database_routines.update({
        where: {
          id_routine: data.id_routine,
        },
        data,
      });
    } catch (error) {
      return null;
    }
  }
  async findById(
    id_database: string,
    id_database_routine: string,
  ): Promise<DatabaseRoutine | null> {
    const data = await this.prisma.database_routines.findUnique({
      where: {
        id_database_id_routine: {
          id_database: id_database,
          id_routine: id_database_routine,
        },
      },
      include: {
        rotinas_executadas: {
          where: {
            deleted: false,
          },
        },
      },
    });

    return DatabaseRoutineMapper.toDomain(data);
  }

  async findRoutinesByDatabase(
    id_database: string,
  ): Promise<DatabaseRoutine[]> {
    const data = await this.prisma.database_routines.findMany({
      where: {
        id_database: id_database,
      },
      include: {
        rotinas_executadas: {
          where: {
            deleted: false,
          },
        },
      },
    });

    return data.map((databaseRoutine) =>
      DatabaseRoutineMapper.toDomain(databaseRoutine),
    );
  }
}
