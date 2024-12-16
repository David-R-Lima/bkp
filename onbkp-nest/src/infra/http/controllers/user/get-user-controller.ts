import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { CurrentUser } from 'src/infra/auth/current-user.decorator';
import { GetUserUseCase } from 'src/domain/backup/application/use-cases/user/get-user';
import { UserPresenter } from '../../presenters/user-presenter';

@Controller('/users')
export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  @Get('/:id')
  async handle(@Param('id') id: string) {
    const userId = id;

    const result = await this.getUserUseCase.execute(userId);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const userProfile = result.value.user;

    return {
      user: UserPresenter.toHTTP(userProfile),
    };
  }

  @Get('/')
  async handleWithoutId(@CurrentUser() user: UserPayload) {
    const userId = user.sub;
    const result = await this.getUserUseCase.execute(userId);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const userProfile = result.value.user;

    return {
      user: UserPresenter.toHTTP(userProfile),
    };
  }
}
