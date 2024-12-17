import { Controller, Post, Body } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CurrentUser } from 'src/infra/auth/current-user.decorator';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { NotificationType } from 'src/domain/backup/enterprise/entities/database-notification';
import { CreateNotification } from 'src/domain/backup/application/use-cases/notifications/create-notification';

const schema = z.object({
  email: z.string().email(),
  event: z.array(z.nativeEnum(NotificationType)),
});

type Schema = z.infer<typeof schema>;
const pipe = new ZodValidationPipe(schema);

@Controller('/notifications')
export class CreateNotificationController {
  constructor(private createNotification: CreateNotification) {}

  @Post()
  async handle(@Body(pipe) body: Schema, @CurrentUser() user: UserPayload) {
    const { email, event } = body;

    await this.createNotification.execute({
      email,
      event,
      userId: user.sub,
    });

    return { message: 'Notifications processed successfully' };
  }
}
