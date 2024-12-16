import { Either, left, right } from 'src/core/either';
import { IUserRepository } from 'src/domain/backup/enterprise/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { SendEmail } from '../../mail/send-email';

interface AuthenticateUseUseCaseRequest {
  email: string;
}
type AuthenticateUseUseCaseResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class CreateLoginCodeUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private mailService: SendEmail,
  ) {}

  async execute({
    email,
  }: AuthenticateUseUseCaseRequest): Promise<AuthenticateUseUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new ResourceNotFoundError('User not found'));
    }

    const login_code = Math.floor(100000 + Math.random() * 900000);
    console.log('login_code: ', login_code);

    user.session_id = randomUUID();
    user.code = login_code;

    await this.usersRepository.update(user);

    // await this.mailService.send({
    //   recipientEmail: email,
    //   message: `Your login code is ${login_code}`,
    //   subject: 'Login code',
    // });

    return right(null);
  }
}
