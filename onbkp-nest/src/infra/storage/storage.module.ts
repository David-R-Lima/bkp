import { Module } from '@nestjs/common';
import { LocalModule } from './local/local.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [LocalModule, S3Module],
  exports: [LocalModule, S3Module],
})
export class StorageModule {}
