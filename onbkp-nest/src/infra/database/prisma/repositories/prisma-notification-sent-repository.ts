import { INotificationSentRepository } from 'src/domain/backup/enterprise/repositories/notification-sent-repository';
import { NotificationsSentMapper } from '../mappers/notifications-sent-mapper';
import { NotificationsSent } from 'src/domain/backup/enterprise/entities/notifications-sent';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationSentRepository
  implements INotificationSentRepository
{
  constructor(private prisma: PrismaService) {}

  async create(
    notificationSent: NotificationsSent,
  ): Promise<NotificationsSent | null> {
    const data = NotificationsSentMapper.toPrisma(notificationSent);

    try {
      const res = await this.prisma.notifications_sent.create({
        data,
      });

      return NotificationsSentMapper.toDomain(res);
    } catch (error) {
      return null;
    }
  }

  async update(
    notificationSent: NotificationsSent,
  ): Promise<NotificationsSent | void> {
    const data = NotificationsSentMapper.toPrisma(notificationSent);

    try {
      await this.prisma.notifications_sent.update({
        where: {
          id_executed_routine_id_notification: {
            id_executed_routine: notificationSent.id_executed_routine,
            id_notification: notificationSent.id_notification,
          },
        },
        data,
      });
    } catch (error) {
      return null;
    }
  }

  async findById(
    id_executed_routine: string,
    id_notification: string,
  ): Promise<NotificationsSent | null> {
    const data = await this.prisma.notifications_sent.findUnique({
      where: {
        id_executed_routine_id_notification: {
          id_executed_routine: id_executed_routine,
          id_notification: id_notification,
        },
      },
    });

    return NotificationsSentMapper.toDomain(data);
  }
}
