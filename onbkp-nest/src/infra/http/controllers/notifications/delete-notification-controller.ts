import { Controller, Delete, Param } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { DeleteNotification } from 'src/domain/backup/application/use-cases/notifications/delete-notifications';

const schema = z.object({
  id_notification: z.string(),
});

type Schema = z.infer<typeof schema>;
const pipe = new ZodValidationPipe(schema);

@Controller('/notifications/:id_notification')
export class DeleteNotificationController {
  constructor(private deleteNotification: DeleteNotification) {}

  @Delete()
  async handle(@Param(pipe) params: Schema) {
    const request = params;

    await this.deleteNotification.execute({
      id_notification: request.id_notification,
    });
  }
}
