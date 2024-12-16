import { User } from '../entities/user';

export abstract class IUserRepository {
  abstract create(user: User): Promise<User | null>;
  abstract update(user: User): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
