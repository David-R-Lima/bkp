import {
  Controller,
  Post,
  UsePipes,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

import { z } from 'zod';
import { Public } from 'src/infra/auth/public';
import { AuthenticateUserUseCase } from 'src/domain/backup/application/use-cases/user/authenticate-user';

const authenticateBodyBodySchema = z.object({
  email: z.string().email(),
  code: z.coerce.number(),
});

type AuthenticateBodyBodySchema = z.infer<typeof authenticateBodyBodySchema>;

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodyBodySchema))
  async handle(@Body() body: AuthenticateBodyBodySchema) {
    const { email, code } = body;

    const result = await this.authenticateUser.execute({
      email,
      code,
    });

    if (result.isLeft()) {
      const error = result.value;
      throw new BadRequestException(error.message);
    }

    const { accessToken } = result.value;

    return { access_token: accessToken };
  }
}
