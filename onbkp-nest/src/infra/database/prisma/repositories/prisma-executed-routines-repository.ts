import { ExecutedRoutines } from 'src/domain/backup/enterprise/entities/executed-routines';
import { IExecutedRoutinesRepository } from 'src/domain/backup/enterprise/repositories/executed-routine-repository';
import { ExecutedRoutinesMapper } from '../mappers/executed-routines-mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaginationResponse } from 'src/core/types/pagination';

@Injectable()
export class PrismaExecutedRoutinesRepository
  implements IExecutedRoutinesRepository
{
  constructor(private prisma: PrismaService) {}

  async create(
    executedRoutines: ExecutedRoutines,
  ): Promise<ExecutedRoutines | null> {
    const data = ExecutedRoutinesMapper.toPrisma(executedRoutines);

    try {
      const res = await this.prisma.executed_routines.create({
        data,
      });

      return ExecutedRoutinesMapper.toDomain(res);
    } catch (error) {
      return null;
    }
  }

  async update(
    executedRoutines: ExecutedRoutines,
  ): Promise<ExecutedRoutines | void> {
    const data = ExecutedRoutinesMapper.toPrisma(executedRoutines);

    try {
      await this.prisma.executed_routines.update({
        where: {
          id_routine_id_executed_routine: {
            id_executed_routine: data.id_executed_routine,
            id_routine: data.id_routine,
          },
        },
        data,
      });
    } catch (error) {
      return null;
    }
  }

  async findById(
    id_routine: string,
    id_executed_routine: string,
  ): Promise<ExecutedRoutines | null> {
    const data = await this.prisma.executed_routines.findUnique({
      where: {
        id_routine_id_executed_routine: {
          id_executed_routine: id_executed_routine,
          id_routine: id_routine,
        },
      },
    });

    return ExecutedRoutinesMapper.toDomain(data);
  }

  async findRoutinesByDatabase(
    id_database: string,
  ): Promise<ExecutedRoutines[]> {
    const data = await this.prisma.executed_routines.findMany({
      where: {
        fk_bd_rotinas: {
          id_database: id_database,
        },
        deleted: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return data.map(ExecutedRoutinesMapper.toDomain);
  }

  async findRoutinesByDatabaseWithPagination(
    id_database: string,
    page_index: number,
  ): Promise<PaginationResponse<ExecutedRoutines>> {
    const [executed_routines, count] = await Promise.all([
      await this.prisma.executed_routines.findMany({
        where: {
          fk_bd_rotinas: {
            id_database: id_database,
          },
          deleted: false,
        },
        orderBy: {
          created_at: 'desc',
        },
        skip: page_index * 10,
        take: 10,
      }),

      this.prisma.executed_routines.count({
        where: {
          fk_bd_rotinas: {
            id_database: id_database,
          },
          deleted: false,
        },
      }),
    ]);

    const total_pages = Math.ceil(count / 10);

    return {
      data: executed_routines.map(ExecutedRoutinesMapper.toDomain),
      pageIndex: Number(page_index),
      totalCount: count,
      totalPages: total_pages,
    };
  }
}
