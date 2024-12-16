import { Either, left, right } from 'src/core/either';
import { IUserRepository } from 'src/domain/backup/enterprise/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { Encrypter } from '../../cryptography/encrypter';

interface AuthenticateUseUseCaseRequest {
  email: string;
  code: number;
}
type AuthenticateUseUseCaseResponse = Either<
  ResourceNotFoundError,
  { accessToken: string }
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    code,
  }: AuthenticateUseUseCaseRequest): Promise<AuthenticateUseUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new ResourceNotFoundError('User not found'));
    }

    if (user.code !== code) {
      return left(new ResourceNotFoundError('Wrong code'));
    }

    user.session_id = randomUUID();

    await this.usersRepository.update(user);

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      sessionId: user.session_id.toString(),
      role: user.user_type,
    });

    return right({
      accessToken,
    });
  }
}
