import { DatabaseNotification } from 'src/domain/backup/enterprise/entities/database-notification';

export class NotificationPresenter {
  static toHTTP(notification: DatabaseNotification) {
    return {
      id_notification: notification.id_notification,
      id_user: notification.id_user,
      name: notification.name,
      email: notification.email,
      subject: notification.subject,
      type: notification.type,
      created_at: notification.created_at,
    };
  }
}
