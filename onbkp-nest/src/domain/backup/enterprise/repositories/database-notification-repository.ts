import {
  DatabaseNotification,
  NotificationType,
} from '../entities/database-notification';

interface FindNotificationsByUserId {
  id_user: string;
  notificationTypes?: NotificationType[];
}

interface FindNotificationsByUserEmail {
  email: string;
  notificationTypes?: NotificationType[];
}

export abstract class IDatabaseNotificationRepository {
  abstract create(
    database_notification: DatabaseNotification,
  ): Promise<DatabaseNotification>;
  abstract update(
    database_notification: DatabaseNotification,
  ): Promise<DatabaseNotification | void>;
  abstract findById(
    id_notification: string,
  ): Promise<DatabaseNotification | null>;
  abstract findNotificationsByUserId(
    data: FindNotificationsByUserId,
  ): Promise<DatabaseNotification[] | null>;
  abstract findNotificationsByUserEmail(
    data: FindNotificationsByUserEmail,
  ): Promise<DatabaseNotification[] | null>;
  abstract delete(id_notification: string): Promise<void>;
}
