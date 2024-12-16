import { Controller, Post, Param } from '@nestjs/common';
import { UnscheduleBackupUseCase } from 'src/domain/backup/application/use-cases/database/unschedule-backup';

@Controller('/database/:id_database/:id_routine/unschedule-backup')
export class UnscheduleBackupController {
  constructor(private unscheduleBackupUseCase: UnscheduleBackupUseCase) {}

  @Post()
  async handle(
    @Param('id_database') id_database: string,
    @Param('id_routine') id_routine: string,
  ) {
    await this.unscheduleBackupUseCase.execute(id_database, id_routine);
  }
}
