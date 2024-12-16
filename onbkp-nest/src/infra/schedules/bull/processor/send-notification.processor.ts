import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { SendEmail } from 'src/domain/backup/application/mail/send-email';
import { NotificationType } from 'src/domain/backup/enterprise/entities/database-notification';
import { IDatabaseNotificationRepository } from 'src/domain/backup/enterprise/repositories/database-notification-repository';

@Processor('notifications')
export class SendNotificationProcessor {
  constructor(
    private notificationsRepository: IDatabaseNotificationRepository,
    private sendEmail: SendEmail,
  ) {}
  @Process({
    name: 'schedule-notification',
    concurrency: 100,
  })
  async execute({
    data,
  }: Job<{ id_user: string; types: NotificationType[]; database?: string }>) {
    const notifications =
      await this.notificationsRepository.findNotificationsByUserId({
        id_user: data.id_user,
        notificationTypes: data.types,
      });

    //TODO:
    // types ta em array pq qq coisa fica mais facil de implementar notificações no futuro sla,
    // por hora se for usar passa so um tipo no array.

    let message = '';
    let assunto = '';

    if (data.types.includes(NotificationType.SUCESSO_BACKUP)) {
      message = `Backup do banco: ${data?.database} realizado com sucesso!`;
      assunto = 'Backup realizado com sucesso!';
    }

    if (data.types.includes(NotificationType.ERRO_BACKUP)) {
      message = `Ocorreu um erro ao realizar o backup do banco: ${data?.database}!`;
      assunto = 'Erro ao realizar backup!';
    }

    if (data.types.includes(NotificationType.ERRO_SALVAR_BACKUP)) {
      message = `Ocorreu um erro ao salvar o backup do banco: ${data?.database}!`;
      assunto = 'Erro ao salvar backup!';
    }

    notifications.forEach(async (notification) => {
      if (process.env.NODE_ENV === 'production') {
        await this.sendEmail.send({
          recipientEmail: notification.email,
          message,
          subject: assunto,
        });
      } else {
        console.log(`Enviando email de notificação para ${notification.email}`);
      }
    });
  }
}
