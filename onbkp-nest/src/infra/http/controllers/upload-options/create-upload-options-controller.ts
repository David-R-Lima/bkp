import { Controller, Post, Body } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CurrentUser } from 'src/infra/auth/current-user.decorator';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { UploadType } from 'src/domain/backup/enterprise/entities/upload-options';
import { CreateUploadOption } from 'src/domain/backup/application/use-cases/upload-options/create-upload-options';

const schema = z.object({
  uploadType: z.nativeEnum(UploadType),
});

type Schema = z.infer<typeof schema>;
const pipe = new ZodValidationPipe(schema);

@Controller('/upload-options')
export class CreateUploadOptionsController {
  constructor(private createUploadOption: CreateUploadOption) {}

  @Post()
  async handle(@Body(pipe) body: Schema, @CurrentUser() user: UserPayload) {
    const { uploadType } = body;

    await this.createUploadOption.execute({
      uploadType,
      userId: user.sub,
    });
  }
}
