import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { InternalServerError } from 'src/core/errors/internal-server-error';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { DatabaseNotification } from 'src/domain/backup/enterprise/entities/database-notification';
import { IDatabaseNotificationRepository } from 'src/domain/backup/enterprise/repositories/database-notification-repository';

interface Request {
  id_notification: string;
}

type DeleteNotificationsResponse = Either<
  ResourceNotFoundError | InternalServerError,
  {
    notification: DatabaseNotification;
  }
>;

@Injectable()
export class DeleteNotification {
  constructor(
    private notificationRrepository: IDatabaseNotificationRepository,
  ) {}

  async execute(data: Request): Promise<DeleteNotificationsResponse> {
    const res = await this.notificationRrepository.findById(
      data.id_notification,
    );

    if (!res) {
      return left(new ResourceNotFoundError('Notification not found'));
    }

    await this.notificationRrepository.delete(data.id_notification);

    return right({
      notification: res,
    });
  }
}
