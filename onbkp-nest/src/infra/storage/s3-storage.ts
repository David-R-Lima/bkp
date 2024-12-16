import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { EnvService } from '../env/env.service';
import {
  UploadParams,
  Uploader,
} from 'src/domain/backup/application/storage/uploader';

@Injectable()
export class S3Storage implements Uploader {
  private client: S3Client;

  constructor(private envService: EnvService) {
    this.client = new S3Client({
      region: 'sa-east-1',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY_ID'),
      },
      forcePathStyle: true,
    });
  }

  async upload({ fileName, fileType, file }: UploadParams) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: fileName,
        ContentType: fileType,
        Body: file,
      }),
    );
  }

  async fetch(fileName: string) {
    const data = await this.client.send(
      new GetObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: fileName,
      }),
    );

    const file = await data.Body.transformToByteArray();

    return file;
  }

  async delete(fileName: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: fileName,
      }),
    );
  }
}
