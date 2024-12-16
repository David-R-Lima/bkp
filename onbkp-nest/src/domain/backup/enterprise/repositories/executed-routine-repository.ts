import { PaginationResponse } from 'src/core/types/pagination';
import { ExecutedRoutines } from '../entities/executed-routines';

export abstract class IExecutedRoutinesRepository {
  abstract create(
    executed_routine: ExecutedRoutines,
  ): Promise<ExecutedRoutines>;
  abstract update(
    executed_routine: ExecutedRoutines,
  ): Promise<ExecutedRoutines | void>;
  abstract findById(
    id_routine: string,
    id_executed_routine: string,
  ): Promise<ExecutedRoutines | null>;
  abstract findRoutinesByDatabase(
    id_database: string,
  ): Promise<ExecutedRoutines[]>;

  abstract findRoutinesByDatabaseWithPagination(
    id_database: string,
    page_index: number,
  ): Promise<PaginationResponse<ExecutedRoutines>>;
}
