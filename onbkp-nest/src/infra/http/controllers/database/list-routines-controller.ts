import { Controller, Get, Param } from '@nestjs/common';
import { ListRoutinesUseCase } from 'src/domain/backup/application/use-cases/database/list-routines';
import { DatabaseRoutinePresenter } from '../../presenters/database-routines-presenter';

@Controller('/routines/:id_database')
export class ListRoutinesController {
  constructor(private listRoutinesUseCase: ListRoutinesUseCase) {}

  @Get()
  async handle(@Param('id_database') id_database: string) {
    const res = await this.listRoutinesUseCase.execute(id_database);

    if (res.isLeft()) {
      return res.value;
    }
    return res.value.routines.map(DatabaseRoutinePresenter.toHTTP);
  }
}
