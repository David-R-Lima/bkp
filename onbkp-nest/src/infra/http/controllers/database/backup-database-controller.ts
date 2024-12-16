import { Controller, Post, Param } from '@nestjs/common';
import { BackupDatabaseUseCase } from 'src/domain/backup/application/use-cases/database/backup-database';

@Controller('/database/:id_database/backup')
export class BackupDatabaseController {
  constructor(private backupDatabase: BackupDatabaseUseCase) {}

  @Post()
  async handle(@Param('id_database') id_database: string) {
    await this.backupDatabase.execute(id_database);
  }
}
