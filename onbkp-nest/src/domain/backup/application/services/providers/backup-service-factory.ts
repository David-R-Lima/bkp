import { DatabaseType } from 'src/domain/backup/enums/databaseType';
import { BackupService } from '../backup-service';

export abstract class BackupServiceFactory {
  abstract getService(type: DatabaseType): BackupService;
}
