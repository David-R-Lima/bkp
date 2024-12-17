import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import {
  DatabaseNotification,
  NotificationType,
} from 'src/domain/backup/enterprise/entities/database-notification';
import { IDatabaseNotificationRepository } from 'src/domain/backup/enterprise/repositories/database-notification-repository';
import { IUserRepository } from 'src/domain/backup/enterprise/repositories/user-repository';

interface Request {
  userId: string;
  email: string;
  event: NotificationType[];
}

@Injectable()
export class CreateNotification {
  constructor(
    private userRepository: IUserRepository,
    private notificationRepository: IDatabaseNotificationRepository,
  ) {}

  async execute(data: Request) {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const existingNotifications =
      await this.notificationRepository.findNotificationsByUserEmail({
        email: data.email,
      });

    const existingTypes = existingNotifications.map(
      (notification) => notification.type,
    );

    const notificationsToCreate = data.event.filter(
      (type) => !existingTypes.includes(type),
    );

    const notificationsToDelete = existingNotifications.filter(
      (notification) => !data.event.includes(notification.type),
    );

    // Create notifications
    for (const type of notificationsToCreate) {
      const id = new UniqueEntityID();

      const notification = DatabaseNotification.create(
        {
          id_user: user.id.toString(),
          id_notification: id.toString(),
          name: user.name,
          subject: 'Backup Notification',
          email: data.email,
          type: type,
          created_at: new Date(),
        },
        id,
      );

      await this.notificationRepository.create(notification);
    }

    // Delete notifications
    for (const notification of notificationsToDelete) {
      await this.notificationRepository.delete(notification.id_notification);
    }
  }
}
