import { Controller, Get, Query } from '@nestjs/common';
import { DatabasePresenter } from '../../presenters/database-presenter';
import { GetDatabaseByIdUseCase } from 'src/domain/backup/application/use-cases/database/get-databse-by-id';

@Controller('/databases')
export class GetDatabaseByIdController {
  constructor(private getDatabaseByIdUseCase: GetDatabaseByIdUseCase) {}

  @Get()
  async handle(@Query('id_database') id_database: string) {
    const res = await this.getDatabaseByIdUseCase.execute({
      id_database,
    });

    if (res.isLeft()) {
      return res.value;
    }
    return {
      database: DatabasePresenter.toHTTP(res.value.database),
    };
  }
}
