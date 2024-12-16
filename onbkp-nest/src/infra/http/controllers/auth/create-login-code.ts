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
import { CreateLoginCodeUseCase } from 'src/domain/backup/application/use-cases/user/create-login-code';

const authenticateBodyBodySchema = z.object({
  email: z.string().email(),
});

type CreateLoginCodeBodySchema = z.infer<typeof authenticateBodyBodySchema>;

@Controller('/users/create-login-code')
@Public()
export class CreateLoginCodeController {
  constructor(private createLoginCodeUseCase: CreateLoginCodeUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodyBodySchema))
  async handle(@Body() body: CreateLoginCodeBodySchema) {
    const { email } = body;

    const result = await this.createLoginCodeUseCase.execute({
      email,
    });

    if (result.isLeft()) {
      const error = result.value;
      throw new BadRequestException(error.message);
    }
  }
}
