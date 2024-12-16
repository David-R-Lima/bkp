import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListDatabasesUseCase } from 'src/domain/backup/application/use-cases/database/list-databases';
import { DatabasePresenter } from '../../presenters/database-presenter';

@Controller('/databases/:id_user')
export class ListDatabasesController {
  constructor(private listDatabasesUseCase: ListDatabasesUseCase) {}

  @Get()
  async handle(
    @Param('id_user') id_user: string,
    @Query('project') project: string,
    @Query('page_index') page_index: number,
  ) {
    const res = await this.listDatabasesUseCase.execute({
      id_user,
      project,
      page_index,
    });

    if (res.isLeft()) {
      return res.value;
    }
    return {
      data: res.value.databases.map(DatabasePresenter.toHTTP),
      meta: {
        pageIndex: res.value.pageIndex,
        totalCount: res.value.totalCount,
        totalPages: res.value.totalPages,
      },
    };
  }
}
