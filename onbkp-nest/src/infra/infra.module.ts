import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { BackupModule } from './services/backup/backup.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [DatabaseModule, EnvModule, BackupModule, HttpModule],
  controllers: [],
  providers: [],
})
export class InfraModule {}
