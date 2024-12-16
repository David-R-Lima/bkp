import { IDatabaseRepository } from 'src/domain/backup/enterprise/repositories/database-repository';
import { Database } from 'src/domain/backup/enterprise/entities/database';
import { DatabaseMapper } from '../mappers/database-mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaginationResponse } from 'src/core/types/pagination';

@Injectable()
export class PrismaDatabaseRepository implements IDatabaseRepository {
  constructor(private prisma: PrismaService) {}
  async create(database: Database): Promise<Database | null> {
    const data = DatabaseMapper.toPrisma(database);

    try {
      const res = await this.prisma.database.create({
        data,
      });

      return DatabaseMapper.toDomain(res);
    } catch (error) {
      return null;
    }
  }
  async update(database: Database): Promise<Database | void> {
    const data = DatabaseMapper.toPrisma(database);

    try {
      await this.prisma.database.update({
        where: {
          id_database: database.id.toString(),
        },
        data,
      });
    } catch (error) {
      return null;
    }
  }
  async findById(id_database: string): Promise<Database | null> {
    const data = await this.prisma.database.findUnique({
      where: {
        id_database,
      },
    });

    return DatabaseMapper.toDomain(data);
  }

  async findByUserId(
    id_user: string,
    page_index: number,
    project: string,
  ): Promise<PaginationResponse<Database>> {
    const [databases, count] = await Promise.all([
      await this.prisma.database.findMany({
        where: {
          id_user: id_user,
          id_project: project ?? null,
        },
        orderBy: {
          created_at: 'asc',
        },
        skip: page_index * 10,
        take: 10,
      }),

      this.prisma.database.count({
        where: {
          id_user: id_user,
          id_project: project,
        },
      }),
    ]);

    const total_pages = Math.ceil(count / 10);

    return {
      data: databases.map(DatabaseMapper.toDomain),
      pageIndex: Number(page_index),
      totalCount: count,
      totalPages: total_pages,
    };
  }
}
