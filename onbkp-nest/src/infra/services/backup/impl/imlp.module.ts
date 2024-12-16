import { Module } from '@nestjs/common';
import { BackupFactoryImpl } from './backup';
import { BackupServiceFactory } from 'src/domain/backup/application/services/providers/backup-service-factory';

@Module({
  providers: [
    {
      provide: BackupServiceFactory,
      useClass: BackupFactoryImpl,
    },
  ],
  exports: [
    {
      provide: BackupServiceFactory,
      useClass: BackupFactoryImpl,
    },
  ],
})
export class ImplModule {}
