import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/infra/auth/current-user.decorator';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { GetUploadOption } from 'src/domain/backup/application/use-cases/upload-options/get-user-upload-options';
import { UploadOptionsPresenter } from '../../presenters/upload-options-presenter';

@Controller('/upload-options')
export class GetUploadOptionsController {
  constructor(private getUploadOption: GetUploadOption) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const res = await this.getUploadOption.execute({
      userId: user.sub,
    });

    if (res.isLeft()) {
      return res.value;
    }

    return {
      uploadOptions: UploadOptionsPresenter.toHTTP(res.value.uploadOptions),
    };
  }
}
