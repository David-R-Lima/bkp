import { DatabaseNotification } from 'src/domain/backup/enterprise/entities/database-notification';
import { IDatabaseNotificationRepository } from 'src/domain/backup/enterprise/repositories/database-notification-repository';
import { DatabaseNotificationMapper } from '../mappers/database-notification-mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaDatabaseNotifications
  implements IDatabaseNotificationRepository
{
  constructor(private prisma: PrismaService) {}
  async create(
    databaseNotification: DatabaseNotification,
  ): Promise<DatabaseNotification | null> {
    const data = DatabaseNotificationMapper.toPrisma(databaseNotification);

    try {
      const res = await this.prisma.database_notification.create({
        data,
      });

      return DatabaseNotificationMapper.toDomain(res);
    } catch (error) {
      return null;
    }
  }
  async update(
    databaseNotification: DatabaseNotification,
  ): Promise<DatabaseNotification | void> {
    const data = DatabaseNotificationMapper.toPrisma(databaseNotification);

    try {
      await this.prisma.database_notification.update({
        where: {
          id_notification: databaseNotification.id_notification,
        },
        data,
      });
    } catch (error) {
      return null;
    }
  }
  async findById(
    id_notification: string,
  ): Promise<DatabaseNotification | null> {
    const data = await this.prisma.database_notification.findUnique({
      where: {
        id_notification,
      },
    });

    return DatabaseNotificationMapper.toDomain(data);
  }

  async findNotificationsByUserId({
    id_user,
    notificationTypes,
  }): Promise<DatabaseNotification[] | null> {
    const data = await this.prisma.database_notification.findMany({
      where: {
        id_user,
        ...(notificationTypes &&
          notificationTypes.length > 0 && {
            type: {
              in: notificationTypes,
            },
          }),
      },
    });

    return data.map((notification) =>
      DatabaseNotificationMapper.toDomain(notification),
    );
  }

  async delete(id_notification: string): Promise<void> {
    await this.prisma.database_notification.delete({
      where: {
        id_notification,
      },
    });
  }

  async findNotificationsByUserEmail({
    email,
    notificationTypes,
  }): Promise<DatabaseNotification[] | null> {
    const res = await this.prisma.database_notification.findMany({
      where: {
        email,
        ...(notificationTypes &&
          notificationTypes.length > 0 && {
            type: {
              in: notificationTypes,
            },
          }),
      },
    });

    return res.map((notification) =>
      DatabaseNotificationMapper.toDomain(notification),
    );
  }
}
