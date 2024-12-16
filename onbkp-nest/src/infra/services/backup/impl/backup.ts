import { BackupService } from 'src/domain/backup/application/services/backup-service';
import { DatabaseType } from 'src/domain/backup/enums/databaseType';
import { PostgresBackupService } from '../postgres/backup';
import { Injectable } from '@nestjs/common';
import { MySqlBackupService } from '../mysql/backup';
import { MongoBackupService } from '../mongo/backup';

@Injectable()
export class BackupFactoryImpl {
  getService(type: DatabaseType): BackupService {
    switch (type) {
      case DatabaseType.POSTGRES:
        return new PostgresBackupService();
      case DatabaseType.MYSQL:
        return new MySqlBackupService();
      case DatabaseType.MONGO:
        return new MongoBackupService();
      default:
        throw new Error('Invalid database type');
    }
  }
}
