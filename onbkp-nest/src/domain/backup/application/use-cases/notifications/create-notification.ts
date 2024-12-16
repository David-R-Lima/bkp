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
  event: NotificationType;
}

@Injectable()
export class CreateNotification {
  constructor(
    private userRepository: IUserRepository,
    private notificationRrepository: IDatabaseNotificationRepository,
  ) {}

  async execute(data: Request) {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const id = new UniqueEntityID();

    const notification = DatabaseNotification.create(
      {
        id_user: user.id.toString(),
        id_notification: id.toString(),
        name: user.name,
        subject: 'Backup Notification',
        email: data.email,
        type: data.event,
        created_at: new Date(),
      },
      id,
    );

    await this.notificationRrepository.create(notification);
  }
}
