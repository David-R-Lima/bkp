import {
  Prisma,
  notifications_sent as PrismaNotificationsSent,
} from '@prisma/client';
import { NotificationsSent } from 'src/domain/backup/enterprise/entities/notifications-sent';

export class NotificationsSentMapper {
  static toDomain(notificationsSent: PrismaNotificationsSent) {
    return NotificationsSent.create({
      id_executed_routine: notificationsSent.id_executed_routine,
      id_notification: notificationsSent.id_notification,
      email: notificationsSent.email,
      sent_at: notificationsSent.sent_at,
    });
  }
  static toPrisma(
    notificationsSent: NotificationsSent,
  ): Prisma.notifications_sentUncheckedCreateInput {
    return {
      id_executed_routine: notificationsSent.id_executed_routine,
      id_notification: notificationsSent.id_notification,
      email: notificationsSent.email,
      sent_at: notificationsSent.sent_at,
    };
  }
}
