import { NotificationsSent } from '../entities/notifications-sent';

export abstract class INotificationSentRepository {
  abstract create(
    notifications_sent: NotificationsSent,
  ): Promise<NotificationsSent>;
  abstract update(
    notifications_sent: NotificationsSent,
  ): Promise<NotificationsSent | void>;
  abstract findById(
    id_notification: string,
    id_executed_routine: string,
  ): Promise<NotificationsSent | null>;
}
