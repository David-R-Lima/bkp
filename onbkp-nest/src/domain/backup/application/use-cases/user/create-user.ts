import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { User } from 'src/domain/backup/enterprise/entities/user';
import { IUserRepository } from 'src/domain/backup/enterprise/repositories/user-repository';
import { UserType } from 'src/domain/backup/enums/user-type';

interface Request {
  name: string;
  email: string;
  password: string;
}

type CreateUserResponse = Either<
  ResourceAlreadyExistsError,
  {
    user: User;
  }
>;

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    email,
    name,
    password,
  }: Request): Promise<CreateUserResponse> {
    const user = User.create(
      {
        name,
        email,
        password,
        recovery_code: 0,
        status: true,
        created_at: new Date(),
        user_type: UserType.A,
      },
      new UniqueEntityID(),
    );
    const res = await this.userRepository.create(user);

    if (res) {
      return right({
        user: res,
      });
    }
  }
}
