import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { UserType } from '../../enums/user-type';

export interface UserProps {
  name: string;
  password: string;
  email: string;
  recovery_code: number;
  status: boolean;
  created_at: Date;
  user_type: UserType;
  session_id?: string;
  code?: number;
}
export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get password() {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
  }

  get email() {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get recovery_code() {
    return this.props.recovery_code;
  }

  set recovery_code(value: number) {
    this.props.recovery_code = value;
  }

  get status() {
    return this.props.status;
  }

  set status(value: boolean) {
    this.props.status = value;
  }

  get created_at() {
    return this.props.created_at;
  }

  set created_at(value: Date) {
    this.props.created_at = value;
  }

  get user_type() {
    return this.props.user_type;
  }

  set user_type(value: UserType) {
    this.props.user_type = value;
  }

  get session_id() {
    return this.props.session_id;
  }

  set session_id(value: string) {
    this.props.session_id = value;
  }

  get code() {
    return this.props.code;
  }

  set code(value: number) {
    this.props.code = value;
  }
  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
      },
      id,
    );

    return user;
  }
}
