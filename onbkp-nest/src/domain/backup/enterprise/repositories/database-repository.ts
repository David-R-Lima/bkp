import { PaginationResponse } from 'src/core/types/pagination';
import { Database } from '../entities/database';
export abstract class IDatabaseRepository {
  abstract create(database: Database): Promise<Database>;
  abstract update(database: Database): Promise<Database | void>;
  abstract findById(id_database: string): Promise<Database | null>;
  abstract findByUserId(
    id_user: string,
    page_index: number,
    project: string,
  ): Promise<PaginationResponse<Database>>;
}
