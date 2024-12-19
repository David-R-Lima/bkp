export enum UploadType {
    s3 = 's3',
    local = 'local',
  }
  
export interface UploadOptions {
  upload_type: UploadType;
  id_upload_options: string
  id_user: string;
}