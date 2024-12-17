import { Injectable } from '@nestjs/common';
import { UploadType } from 'src/domain/backup/enterprise/entities/upload-options';
import { LocalStorage } from '../local/local-storage';
import { Uploader } from 'src/domain/backup/application/storage/uploader';
import { S3Storage } from '../s3/s3-storage';
import { EnvService } from 'src/infra/env/env.service';

@Injectable()
export class UploaderFactoryImpl {
  constructor(private env: EnvService) {}
  getService(type: UploadType): Uploader {
    switch (type) {
      case UploadType.local:
        return new LocalStorage();
      case UploadType.s3:
        return new S3Storage(this.env);
      default:
        throw new Error('Invalid upload type');
    }
  }
}
