import { Controller, Post, Body } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateDatabaseUseCase } from 'src/domain/backup/application/use-cases/database/create-database';
import { DatabaseType } from 'src/domain/backup/enums/databaseType';
import { CurrentUser } from 'src/infra/auth/current-user.decorator';
import { UserPayload } from 'src/infra/auth/jwt.strategy';

const schema = z.object({
  server: z.string().transform((desc) => desc.replace(/[^a-zA-Z0-9]/g, '')),
  port: z.coerce.number(),
  host: z.string().transform((desc) => desc.replace(/[^a-zA-Z0-9.]/g, '')),
  database_name: z
    .string()
    .transform((desc) => desc.replace(/[^a-zA-Z0-9]/g, '')),
  database_type: z.nativeEnum(DatabaseType),
  database_user: z
    .string()
    .transform((desc) => desc.replace(/[^a-zA-Z0-9]/g, '')),
  database_password: z
    .string()
    .transform((desc) => desc.replace(/[^a-zA-Z0-9]/g, '')),
  database_collection: z.string().optional(),
  database_description: z.string(),
  id_project: z.string().optional(),
});

type Schema = z.infer<typeof schema>;
const pipe = new ZodValidationPipe(schema);

@Controller('/database')
export class CreateDatabaseController {
  constructor(private createDatabase: CreateDatabaseUseCase) {}

  @Post()
  async handle(@Body(pipe) body: Schema, @CurrentUser() user: UserPayload) {
    const request = body;

    await this.createDatabase.execute({
      id_user: user.sub,
      server: request.server,
      host: request.host,
      port: request.port,
      database_user: request.database_user,
      database_description: request.database_description,
      database_type: request.database_type,
      database_password: request.database_password,
      database_name: request.database_name,
      database_collection: request.database_collection,
      id_project: request.id_project,
    });
  }
}
