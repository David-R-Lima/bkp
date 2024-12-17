import { Prisma, upload_options as PrismaUploadOptions } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import {
  UploadOptions,
  UploadType,
} from 'src/domain/backup/enterprise/entities/upload-options';

export class UploadOptionsMapper {
  static toDomain(uploadOptions: PrismaUploadOptions) {
    return UploadOptions.create(
      {
        uploadType: uploadOptions.uploadType as UploadType,
        id_user: new UniqueEntityID(uploadOptions.id_user),
      },
      new UniqueEntityID(uploadOptions.id.toString()),
    );
  }
  static toPrisma(
    uploadOptions: UploadOptions,
  ): Prisma.upload_optionsUncheckedCreateInput {
    return {
      id: Number(uploadOptions.id.toString()),
      uploadType: uploadOptions.uploadType,
      id_user: uploadOptions.id_user.toString(),
    };
  }
}
