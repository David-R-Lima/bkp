import { Module, forwardRef } from '@nestjs/common';
import { BullConfigModule } from '../schedules/bull/bull.module';
import { DatabaseModule } from '../database/database.module';
import { BackupModule } from '../services/backup/backup.module';
import { CreateUserUseCase } from 'src/domain/backup/application/use-cases/user/create-user';
import { CreateUserController } from './controllers/user/create-user-controller';
import { CreateDatabaseUseCase } from 'src/domain/backup/application/use-cases/database/create-database';
import { CreateDatabaseController } from './controllers/database/create-database-controller';
import { BackupDatabaseController } from './controllers/database/backup-database-controller';
import { BackupDatabaseUseCase } from 'src/domain/backup/application/use-cases/database/backup-database';
import { ScheduleBackupController } from './controllers/database/schedule-backup-controller';
import { ScheduleBackupUseCase } from 'src/domain/backup/application/use-cases/database/schedule-backup';
import { UnscheduleBackupUseCase } from 'src/domain/backup/application/use-cases/database/unschedule-backup';
import { UnscheduleBackupController } from './controllers/database/unschedule-backup';
import { ListRoutinesController } from './controllers/database/list-routines-controller';
import { ListRoutinesUseCase } from 'src/domain/backup/application/use-cases/database/list-routines';
import { StorageModule } from '../storage/storage.module';
import { DownloadBackupUseCase } from 'src/domain/backup/application/use-cases/database/download-backup';
import { DownloadBackupController } from './controllers/database/download-backup-controller';
import { ListDatabasesController } from './controllers/database/list-databases-controller';
import { ListDatabasesUseCase } from 'src/domain/backup/application/use-cases/database/list-databases';
import { GetDatabaseByIdUseCase } from 'src/domain/backup/application/use-cases/database/get-databse-by-id';
import { GetDatabaseByIdController } from './controllers/database/get-database-by-id-controller';
import { ListExecutedRoutinesUseCase } from 'src/domain/backup/application/use-cases/database/list-executed-routines';
import { ListExecutedRoutinesController } from './controllers/database/list-executed-routines-controller';
import { CreateDatabaseRoutineUseCase } from 'src/domain/backup/application/use-cases/database/create-database-routine';
import { CreateDatabaseRoutineController } from './controllers/database/create-database-routine-controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controllers/auth/authenticate-controller';
import { AuthenticateUserUseCase } from 'src/domain/backup/application/use-cases/user/authenticate-user';
import { GetUserUseCase } from 'src/domain/backup/application/use-cases/user/get-user';
import { GetUserController } from './controllers/user/get-user-controller';
import { CreateLoginCodeUseCase } from 'src/domain/backup/application/use-cases/user/create-login-code';
import { CreateLoginCodeController } from './controllers/auth/create-login-code';
import { MailModule } from '../mail/mail.module';
import { CreateNotification } from 'src/domain/backup/application/use-cases/notifications/create-notification';
import { CreateNotificationController } from './controllers/notifications/create-notification-controller';
import { ListNotifications } from 'src/domain/backup/application/use-cases/notifications/get-notifications';
import { ListNotificationController } from './controllers/notifications/get-notifications-controller';
import { DeleteNotification } from 'src/domain/backup/application/use-cases/notifications/delete-notifications';
import { DeleteNotificationController } from './controllers/notifications/delete-notification-controller';
import { CreateUploadOption } from 'src/domain/backup/application/use-cases/upload-options/create-upload-options';
import { CreateUploadOptionsController } from './controllers/upload-options/create-upload-options-controller';
@Module({
  imports: [
    StorageModule,
    DatabaseModule,
    BackupModule,
    CryptographyModule,
    MailModule,
    forwardRef(() => BullConfigModule),
  ],
  controllers: [
    CreateUserController,
    CreateDatabaseController,
    BackupDatabaseController,
    ScheduleBackupController,
    UnscheduleBackupController,
    ListRoutinesController,
    DownloadBackupController,
    ListDatabasesController,
    GetDatabaseByIdController,
    ListExecutedRoutinesController,
    CreateDatabaseRoutineController,
    AuthenticateController,
    GetUserController,
    CreateLoginCodeController,
    CreateNotificationController,
    ListNotificationController,
    DeleteNotificationController,
    CreateUploadOptionsController,
  ],
  providers: [
    CreateUserUseCase,
    CreateDatabaseUseCase,
    BackupDatabaseUseCase,
    ScheduleBackupUseCase,
    UnscheduleBackupUseCase,
    ListRoutinesUseCase,
    DownloadBackupUseCase,
    ListDatabasesUseCase,
    GetDatabaseByIdUseCase,
    ListExecutedRoutinesUseCase,
    CreateDatabaseRoutineUseCase,
    AuthenticateUserUseCase,
    GetUserUseCase,
    CreateLoginCodeUseCase,
    CreateNotification,
    ListNotifications,
    DeleteNotification,
    CreateUploadOption,
  ],
})
export class HttpModule {}
