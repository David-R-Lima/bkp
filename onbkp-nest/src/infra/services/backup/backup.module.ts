import { Module } from '@nestjs/common';
import { PostgresModule } from './postgres/postgres.module';
import { MySqlModule } from './mysql/mysql.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [PostgresModule, MySqlModule, MongoModule],
  exports: [PostgresModule, MySqlModule, MongoModule],
})
export class BackupModule {}
