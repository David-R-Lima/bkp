import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { InternalServerError } from 'src/core/errors/internal-server-error';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { Database } from 'src/domain/backup/enterprise/entities/database';
import { IDatabaseRepository } from 'src/domain/backup/enterprise/repositories/database-repository';

interface ListDatabasesRequest {
  page_index: number;
  id_user: string;
  project: string;
}

type ListRoutinesResponse = Either<
  ResourceAlreadyExistsError | InternalServerError,
  {
    databases: Database[];
    pageIndex: number;
    totalCount: number;
    totalPages: number;
  }
>;

@Injectable()
export class ListDatabasesUseCase {
  constructor(private readonly databaseRoutines: IDatabaseRepository) {}
  async execute({
    id_user,
    page_index,
    project,
  }: ListDatabasesRequest): Promise<ListRoutinesResponse> {
    const databases = await this.databaseRoutines.findByUserId(
      id_user,
      page_index,
      project,
    );

    return right({
      databases: databases.data,
      pageIndex: databases.pageIndex,
      totalCount: databases.totalCount,
      totalPages: databases.totalPages,
    });
  }
}
