import { User } from 'src/domain/backup/enterprise/entities/user';
import { Prisma, user as PrismaUser } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { UserType } from 'src/domain/backup/enums/user-type';

export class UserMapper {
  static toDomain(user: PrismaUser) {
    return User.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: user.created_at,
        status: user.status,
        recovery_code: user.recovery_code,
        user_type: user.user_type as UserType,
        code: user.login_code ?? undefined,
        session_id: user.session_id ?? undefined,
      },
      new UniqueEntityID(user.id_user),
    );
  }
  static toPrisma(user: User): Prisma.userUncheckedCreateInput {
    return {
      id_user: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      status: user.status,
      recovery_code: user.recovery_code,
      user_type: user.user_type as UserType,
      login_code: user.code ?? undefined,
      session_id: user.session_id ?? undefined,
    };
  }
}
