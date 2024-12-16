import {
  Prisma,
  database_notification as PrismaDatabaseNotification,
} from '@prisma/client';
import {
  DatabaseNotification,
  NotificationType,
} from 'src/domain/backup/enterprise/entities/database-notification';

export class DatabaseNotificationMapper {
  static toDomain(databaseNotification: PrismaDatabaseNotification) {
    return DatabaseNotification.create({
      id_notification: databaseNotification.id_notification,
      id_user: databaseNotification.id_user,
      name: databaseNotification.name,
      email: databaseNotification.email,
      subject: databaseNotification.subject,
      type: databaseNotification.type as NotificationType,
      created_at: databaseNotification.created_at,
    });
  }
  static toPrisma(
    databaseNotification: DatabaseNotification,
  ): Prisma.database_notificationUncheckedCreateInput {
    return {
      id_notification: databaseNotification.id.toString(),
      id_user: databaseNotification.id_user,
      name: databaseNotification.name,
      email: databaseNotification.email,
      subject: databaseNotification.subject,
      type: databaseNotification.type,
      created_at: databaseNotification.created_at,
    };
  }
}
