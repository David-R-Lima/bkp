import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/infra/auth/current-user.decorator';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { ListNotifications } from 'src/domain/backup/application/use-cases/notifications/get-notifications';
import { NotificationPresenter } from '../../presenters/notification-presenter';

@Controller('/notifications')
export class ListNotificationController {
  constructor(private listNotifications: ListNotifications) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const res = await this.listNotifications.execute({
      userId: user.sub,
    });

    if (res.isLeft()) {
      return res.value;
    }

    return {
      notifications: res.value.notifications.map(NotificationPresenter.toHTTP),
    };
  }
}
