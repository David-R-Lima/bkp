import { Injectable } from '@nestjs/common';
import { Either, right } from 'src/core/either';
import { InternalServerError } from 'src/core/errors/internal-server-error';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { DatabaseNotification } from 'src/domain/backup/enterprise/entities/database-notification';
import { IDatabaseNotificationRepository } from 'src/domain/backup/enterprise/repositories/database-notification-repository';
import { IUserRepository } from 'src/domain/backup/enterprise/repositories/user-repository';

interface Request {
  userId: string;
}

type ListNotificationsResponse = Either<
  ResourceNotFoundError | InternalServerError,
  {
    notifications: DatabaseNotification[];
  }
>;

@Injectable()
export class ListNotifications {
  constructor(
    private userRepository: IUserRepository,
    private notificationRrepository: IDatabaseNotificationRepository,
  ) {}

  async execute(data: Request): Promise<ListNotificationsResponse> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const res = await this.notificationRrepository.findNotificationsByUserId({
      id_user: user.id.toString(),
    });

    return right({
      notifications: res,
    });
  }
}
