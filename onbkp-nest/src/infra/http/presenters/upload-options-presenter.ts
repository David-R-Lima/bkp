import { UploadOptions } from 'src/domain/backup/enterprise/entities/upload-options';

export class UploadOptionsPresenter {
  constructor() {}

  static toHTTP(uploadOptions: UploadOptions) {
    return {
      id_upload_options: uploadOptions.id.toString(),
      upload_type: uploadOptions.uploadType,
      id_user: uploadOptions.id_user.toString(),
    };
  }
}
