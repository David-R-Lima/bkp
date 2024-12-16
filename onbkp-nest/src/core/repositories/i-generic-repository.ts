export abstract class IGenericRepository<T> {
  abstract update(t: Partial<T>): Promise<T | void>
  abstract findAll(page: number, itemsPerPage: number): Promise<T[]>
}
