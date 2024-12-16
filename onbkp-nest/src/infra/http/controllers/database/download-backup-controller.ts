import { Controller, Get, Param } from '@nestjs/common';
import { DownloadBackupUseCase } from 'src/domain/backup/application/use-cases/database/download-backup';

@Controller('/backups/:id_routine/:id_executed_routine/download')
export class DownloadBackupController {
  constructor(private downloadBackupUseCase: DownloadBackupUseCase) {}

  @Get()
  async handle(
    @Param('id_routine') id_routine: string,
    @Param('id_executed_routine') id_executed_routine: string,
  ) {
    const response = await this.downloadBackupUseCase.execute(
      id_routine,
      id_executed_routine,
    );

    if (response.isLeft()) {
      return response.value;
    }

    return response.value.file;
  }
}
