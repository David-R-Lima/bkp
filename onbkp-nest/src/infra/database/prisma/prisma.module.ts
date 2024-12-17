import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserRepository } from 'src/domain/backup/enterprise/repositories/user-repository';
import { PrismaUserRepository } from './repositories/prisma-user-repository';
import { IDatabaseRepository } from 'src/domain/backup/enterprise/repositories/database-repository';
import { PrismaDatabaseRepository } from './repositories/prisma-database-repository';
import { IDatabaseRoutineRepository } from 'src/domain/backup/enterprise/repositories/database-routines-repository';
import { PrismaDatabaseRoutinesRepository } from './repositories/prisma-database-routines-repository';
import { IDatabaseNotificationRepository } from 'src/domain/backup/enterprise/repositories/database-notification-repository';
import { PrismaDatabaseNotifications } from './repositories/prisma-database-notification-repository';
import { IExecutedRoutinesRepository } from 'src/domain/backup/enterprise/repositories/executed-routine-repository';
import { PrismaExecutedRoutinesRepository } from './repositories/prisma-executed-routines-repository';
import { INotificationSentRepository } from 'src/domain/backup/enterprise/repositories/notification-sent-repository';
import { PrismaNotificationSentRepository } from './repositories/prisma-notification-sent-repository';
import { IUploadOptionsRepository } from 'src/domain/backup/enterprise/repositories/upload-options-repository';
import { PrismaUploadOptionsRepository } from './repositories/prisma-upload-options-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: IDatabaseRepository,
      useClass: PrismaDatabaseRepository,
    },
    {
      provide: IDatabaseRoutineRepository,
      useClass: PrismaDatabaseRoutinesRepository,
    },
    {
      provide: IDatabaseNotificationRepository,
      useClass: PrismaDatabaseNotifications,
    },
    {
      provide: IExecutedRoutinesRepository,
      useClass: PrismaExecutedRoutinesRepository,
    },
    {
      provide: INotificationSentRepository,
      useClass: PrismaNotificationSentRepository,
    },
    {
      provide: IUploadOptionsRepository,
      useClass: PrismaUploadOptionsRepository,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: IDatabaseRepository,
      useClass: PrismaDatabaseRepository,
    },
    {
      provide: IDatabaseRoutineRepository,
      useClass: PrismaDatabaseRoutinesRepository,
    },
    {
      provide: IDatabaseNotificationRepository,
      useClass: PrismaDatabaseNotifications,
    },
    {
      provide: IExecutedRoutinesRepository,
      useClass: PrismaExecutedRoutinesRepository,
    },
    {
      provide: INotificationSentRepository,
      useClass: PrismaNotificationSentRepository,
    },
    {
      provide: IUploadOptionsRepository,
      useClass: PrismaUploadOptionsRepository,
    },
  ],
})
export class PrismaModule {}
