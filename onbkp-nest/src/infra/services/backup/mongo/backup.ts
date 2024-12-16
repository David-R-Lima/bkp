import { Injectable } from '@nestjs/common';
import { BackupRequest } from 'src/domain/backup/application/services/types/backup';
import { execute } from '@getvim/execute';

@Injectable()
export class MongoBackupService {
  async execute(request: BackupRequest): Promise<boolean> {
    const { server, database, password, port, user, host, file } = request;
    try {
      await execute(
        `mongodump ${server}://${user}:${password}@${host}:${port}/${database} --out=temp/${file}`,
      );
      return true;
    } catch (error) {
      console.log('error: ', error);
      return false;
    }
  }
}
