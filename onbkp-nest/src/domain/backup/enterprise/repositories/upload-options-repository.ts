import { UploadOptions } from '../entities/upload-options';

export abstract class IUploadOptionsRepository {
  abstract create(upload_options: UploadOptions): Promise<UploadOptions>;
  abstract update(upload_options: UploadOptions): Promise<UploadOptions | void>;
  abstract findById(id: string): Promise<UploadOptions | null>;
}
