import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/domain/backup/enums/user-type';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
