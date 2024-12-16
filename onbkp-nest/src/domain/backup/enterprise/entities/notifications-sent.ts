import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface NotificationsSentProps {
  id_executed_routine: string;
  id_notification: string;
  email: string;
  sent_at: Date;
}
export class NotificationsSent extends Entity<NotificationsSentProps> {
  get id_executed_routine() {
    return this.props.id_executed_routine;
  }

  set id_executed_routine(value: string) {
    this.props.id_executed_routine = value;
  }

  get id_notification() {
    return this.props.id_notification;
  }

  set id_notification(value: string) {
    this.props.id_notification = value;
  }

  get email() {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get sent_at() {
    return this.props.sent_at;
  }

  set sent_at(value: Date) {
    this.props.sent_at = value;
  }
  static create(props: NotificationsSentProps, id?: UniqueEntityID) {
    const notificationsSent = new NotificationsSent(
      {
        ...props,
      },
      id,
    );

    return notificationsSent;
  }
}
