export interface BackupRequest {
  server: string;
  database: string;
  host: string;
  port: number;
  user: string;
  password: string;
  file: string;
}
