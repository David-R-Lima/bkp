import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export enum NotificationType {
  SUCESSO_BACKUP = 'SB',
  ERRO_BACKUP = 'EB',
  ERRO_SALVAR_BACKUP = 'ES',
}

export interface DatabaseNotificationProps {
  id_notification: string;
  id_user: string;
  name: string;
  email: string;
  subject: string;
  type: NotificationType;
  created_at: Date;
}
export class DatabaseNotification extends Entity<DatabaseNotificationProps> {
  get id_notification() {
    return this.props.id_notification;
  }

  set id_notification(value: string) {
    this.props.id_notification = value;
  }

  get id_user() {
    return this.props.id_user;
  }

  set id_user(value: string) {
    this.props.id_user = value;
  }
  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get subject() {
    return this.props.subject;
  }

  set subject(value: string) {
    this.props.subject = value;
  }

  get type() {
    return this.props.type;
  }

  set type(value: NotificationType) {
    this.props.type = value;
  }

  get created_at() {
    return this.props.created_at;
  }

  set created_at(value: Date) {
    this.props.created_at = value;
  }

  static create(props: DatabaseNotificationProps, id?: UniqueEntityID) {
    const databaseNotification = new DatabaseNotification(
      {
        ...props,
      },
      id,
    );

    return databaseNotification;
  }
}
