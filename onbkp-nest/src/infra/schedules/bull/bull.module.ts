import { BullModule } from '@nestjs/bull';
import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { EnvModule } from 'src/infra/env/env.module';
import { EnvService } from 'src/infra/env/env.service';
import { BackupProcessor } from './processor/backup.processor';
import { BackupModule } from 'src/infra/services/backup/backup.module';
import { HttpModule } from 'src/infra/http/http.module';
import { ImplModule } from 'src/infra/services/backup/impl/imlp.module';
import { BackupFactoryImpl } from 'src/infra/services/backup/impl/backup';
import { StorageModule } from 'src/infra/storage/storage.module';
import { SendNotificationProcessor } from './processor/send-notification.processor';
import { MailModule } from 'src/infra/mail/mail.module';

@Module({
  imports: [
    forwardRef(() => HttpModule),
    ImplModule,
    StorageModule,
    DatabaseModule,
    BackupModule,
    MailModule,
    BullModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        redis: {
          host: envService.get('REDIS_HOST'),
          port: envService.get('REDIS_PORT'),
          password: envService.get('REDIS_PASSWORD'),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'backup',
    }),
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  providers: [BackupProcessor, BackupFactoryImpl, SendNotificationProcessor],
  exports: [BullModule],
})
export class BullConfigModule {}
