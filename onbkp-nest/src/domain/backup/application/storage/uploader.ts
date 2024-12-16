export interface UploadParams {
  fileName: string;
  fileType: string;
  file: Buffer;
}

export abstract class Uploader {
  abstract upload(params: UploadParams): Promise<void>;
  abstract fetch(fileName: string): Promise<Uint8Array>;
  abstract delete(fileName: string): Promise<void>;
}
