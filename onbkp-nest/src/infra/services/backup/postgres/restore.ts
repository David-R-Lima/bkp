import { Injectable } from '@nestjs/common';
import { BackupRequest } from 'src/domain/backup/application/services/types/backup';
import { execute } from '@getvim/execute';

@Injectable()
export class PostgresRestoreService {
  async execute(request: BackupRequest) {
    const { server, database, password, port, user, host, file } = request;
    try {
      await execute(
        `pg_restore --format=t --dbname=${server}://${user}:${password}@${host}:${port}/${database} ${file}`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
