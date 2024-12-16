import { Controller, Post, Body } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateDatabaseRoutineUseCase } from 'src/domain/backup/application/use-cases/database/create-database-routine';

const schema = z.object({
  id_database: z.string(),
  execution_time: z.coerce.date(),
});

type Schema = z.infer<typeof schema>;
const pipe = new ZodValidationPipe(schema);

@Controller('/routine')
export class CreateDatabaseRoutineController {
  constructor(private createDatabaseRoutine: CreateDatabaseRoutineUseCase) {}

  @Post()
  async handle(@Body(pipe) body: Schema) {
    const request = body;

    await this.createDatabaseRoutine.execute({
      id_database: request.id_database,
      execution_time: request.execution_time,
    });
  }
}
