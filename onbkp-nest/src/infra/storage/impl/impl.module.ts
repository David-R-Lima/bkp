import { Module } from '@nestjs/common';
import { UploaderFactoryImpl } from './storage';
import { UploaderServiceFactory } from 'src/domain/backup/application/storage/uploader-factory';
import { EnvModule } from 'src/infra/env/env.module';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: UploaderServiceFactory,
      useClass: UploaderFactoryImpl,
    },
  ],
  exports: [
    {
      provide: UploaderServiceFactory,
      useClass: UploaderFactoryImpl,
    },
  ],
})
export class ImplModule {}
