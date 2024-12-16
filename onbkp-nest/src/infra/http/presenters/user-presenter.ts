import { User } from 'src/domain/backup/enterprise/entities/user';

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id_user: user.id.toString(),
      name: user.name,
      email: user.email,
      user_type: user.user_type,
      status: user.status,
      created_at: user.created_at,
      session_id: user.session_id,
      recovery_code: user.recovery_code,
      code: user.code,
    };
  }
}
