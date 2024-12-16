import { Controller, Post, Param } from '@nestjs/common';
import { ScheduleBackupUseCase } from 'src/domain/backup/application/use-cases/database/schedule-backup';

@Controller('/database/:id_database/:id_routine/schedule-backup')
export class ScheduleBackupController {
  constructor(private scheduleBackupUseCase: ScheduleBackupUseCase) {}

  @Post()
  async handle(
    @Param('id_database') id_database: string,
    @Param('id_routine') id_routine: string,
  ) {
    await this.scheduleBackupUseCase.execute(id_database, id_routine);
  }
}
