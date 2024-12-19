import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { UploadOptions } from 'src/domain/backup/enterprise/entities/upload-options';
import { IUploadOptionsRepository } from 'src/domain/backup/enterprise/repositories/upload-options-repository';

interface Request {
  userId: string;
}

type GetUploadOptionsResponse = Either<
  ResourceNotFoundError,
  {
    uploadOptions: UploadOptions;
  }
>;

@Injectable()
export class GetUploadOption {
  constructor(
    private readonly uploadOptionsRepository: IUploadOptionsRepository,
  ) {}

  async execute(data: Request): Promise<GetUploadOptionsResponse> {
    const res = await this.uploadOptionsRepository.findByUserId(data.userId);

    if (!res || res?.length === 0) {
      return left(new ResourceNotFoundError('Upload options not found'));
    }

    return right({
      uploadOptions: res[0],
    });
  }
}
