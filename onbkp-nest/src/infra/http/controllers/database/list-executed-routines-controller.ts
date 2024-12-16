import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListExecutedRoutinesUseCase } from 'src/domain/backup/application/use-cases/database/list-executed-routines';
import { ExecutedRoutinePresenter } from '../../presenters/executed-routines';

@Controller('/executed-routines/:id_database')
export class ListExecutedRoutinesController {
  constructor(
    private listExecutedRoutinesUseCase: ListExecutedRoutinesUseCase,
  ) {}

  @Get()
  async handle(
    @Param('id_database') id_database: string,
    @Query('page_index') page_index: number,
  ) {
    const res = await this.listExecutedRoutinesUseCase.execute({
      id_database,
      page_index,
    });

    if (res.isLeft()) {
      return res.value;
    }
    return {
      data: res.value.executedRoutines.map(ExecutedRoutinePresenter.toHTTP),
      meta: {
        pageIndex: res.value.pageIndex,
        totalCount: res.value.totalCount,
        totalPages: res.value.totalPages,
      },
    };
  }
}
