import { BackupRequest } from './types/backup';

export abstract class BackupService {
  abstract execute(request: BackupRequest): Promise<boolean>;
}
