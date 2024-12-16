import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { User } from 'src/domain/backup/enterprise/entities/user';
import { IUserRepository } from 'src/domain/backup/enterprise/repositories/user-repository';

type CreateUserResponse = Either<
  ResourceNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class GetUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(id: string): Promise<CreateUserResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new ResourceNotFoundError(id));
    }

    return right({
      user: user,
    });
  }
}
