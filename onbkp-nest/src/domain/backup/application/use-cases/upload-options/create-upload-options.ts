import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import {
  UploadOptions,
  UploadType,
} from 'src/domain/backup/enterprise/entities/upload-options';
import { IUploadOptionsRepository } from 'src/domain/backup/enterprise/repositories/upload-options-repository';

interface Request {
  userId: string;
  uploadType: UploadType;
}

@Injectable()
export class CreateUploadOption {
  constructor(
    private readonly uploadOptionsRepository: IUploadOptionsRepository,
  ) {}

  async execute(data: Request) {
    const existingUploadOptions =
      await this.uploadOptionsRepository.findByUserId(data.userId);

    if (existingUploadOptions.length > 0) {
      existingUploadOptions[0].uploadType = data.uploadType;

      await this.uploadOptionsRepository.update(existingUploadOptions[0]);
    } else {
      const uploadOption = UploadOptions.create(
        {
          uploadType: data.uploadType,
          id_user: new UniqueEntityID(data.userId),
        },
        new UniqueEntityID(),
      );

      await this.uploadOptionsRepository.create(uploadOption);
    }
  }
}
