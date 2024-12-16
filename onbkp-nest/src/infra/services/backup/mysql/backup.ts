import { Injectable } from '@nestjs/common';
import { BackupRequest } from 'src/domain/backup/application/services/types/backup';
import mysqldump from 'mysqldump';

@Injectable()
export class MySqlBackupService {
  async execute(request: BackupRequest): Promise<boolean> {
    const { database, password, port, user, host, file } = request;
    try {
      await mysqldump({
        connection: {
          host: host,
          port: port,
          user: user,
          password: password,
          database: database,
        },
        dumpToFile: `temp/${file}.sql`,
      });
      return true;
    } catch (error) {
      console.log('error: ', error);
      return false;
    }
  }
}
