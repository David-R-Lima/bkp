import { Uploader } from './uploader';
import { UploadType } from '../../enterprise/entities/upload-options';

export abstract class UploaderServiceFactory {
  abstract getService(type: UploadType): Uploader;
}
