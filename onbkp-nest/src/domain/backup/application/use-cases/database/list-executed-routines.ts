import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { InternalServerError } from 'src/core/errors/internal-server-error';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { ExecutedRoutines } from 'src/domain/backup/enterprise/entities/executed-routines';
import { IExecutedRoutinesRepository } from 'src/domain/backup/enterprise/repositories/executed-routine-repository';

interface ListExecutedRoutinesRequest {
  id_database: string;
  page_index: number;
}

type ListExecutedRoutinesResponse = Either<
  ResourceAlreadyExistsError | InternalServerError,
  {
    executedRoutines: ExecutedRoutines[];
    pageIndex: number;
    totalCount: number;
    totalPages: number;
  }
>;

@Injectable()
export class ListExecutedRoutinesUseCase {
  constructor(
    private readonly executedRoutinesRepository: IExecutedRoutinesRepository,
  ) {}
  async execute({
    id_database,
    page_index,
  }: ListExecutedRoutinesRequest): Promise<ListExecutedRoutinesResponse> {
    const res =
      await this.executedRoutinesRepository.findRoutinesByDatabaseWithPagination(
        id_database,
        page_index,
      );

    return right({
      executedRoutines: res.data,
      pageIndex: res.pageIndex,
      totalCount: res.totalCount,
      totalPages: res.totalPages,
    });
  }
}
