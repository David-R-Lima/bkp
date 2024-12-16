import { Controller, Post, Body } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateUserUseCase } from 'src/domain/backup/application/use-cases/user/create-user';

const schema = z.object({
  name: z.string(),
  password: z.string(),
  email: z.string(),
});

type Schema = z.infer<typeof schema>;
const pipe = new ZodValidationPipe(schema);

@Controller('/users')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Post()
  async handle(@Body(pipe) body: Schema) {
    const request = body;

    await this.createUser.execute({
      name: request.name,
      email: request.email,
      password: request.password,
    });
  }
}
