// id_routine          String    @map("CD_RTN") @db.VarChar(100)
// id_executed_routine String    @unique @default(uuid()) @map("CD_EXE_RTN")
// time_to_start       DateTime? @map("DH_PRV") @db.Timestamp()
// start_routine       DateTime? @map("DH_INI_RTN") @db.Timestamp()
// end_routine         DateTime? @map("DH_FIN_RTN") @db.Timestamp()
// start_backup        DateTime? @map("DH_INI_BKP") @db.Timestamp()
// end_backup          DateTime? @map("DH_FIN_BKP") @db.Timestamp()
// start_compression   DateTime? @map("DH_INI_CMP") @db.Timestamp()
// end_compression     DateTime? @map("DH_FIN_CMP") @db.Timestamp()
// start_send_cloud    DateTime? @map("DH_INI_NUV") @db.Timestamp()
// end_send_cloud      DateTime? @map("DH_FIN_NUV") @db.Timestamp()
// situation           String?   @map("TP_SIT") @db.VarChar(1)
// file_size           BigInt?   @map("NR_TAM_ARQ")
// deleted             Boolean?  @map("TF_EXC_ARQ")
// file_name           String?   @map("NM_ARQ") @db.VarChar(100)
// observation         Bytes?    @map("TX_OBS")

import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface ExecutedRoutinesProps {
  id_routine: UniqueEntityID;
  time_to_start: Date;
  start_routine?: Date;
  end_routine?: Date;
  start_backup?: Date;
  end_backup?: Date;
  start_compression?: Date;
  end_compression?: Date;
  start_send_cloud?: Date;
  end_send_cloud?: Date;
  situation: string;
  file_size?: number;
  deleted?: boolean;
  file_name?: string;
  observation?: string;
  bucket_key?: string;
  created_at: Date;
}
export class ExecutedRoutines extends Entity<ExecutedRoutinesProps> {
  get id_routine() {
    return this.props.id_routine;
  }
  set id_routine(value: UniqueEntityID) {
    this.props.id_routine = value;
  }

  get time_to_start() {
    return this.props.time_to_start;
  }

  set time_to_start(value: Date) {
    this.props.time_to_start = value;
  }

  get start_routine() {
    return this.props.start_routine;
  }

  set start_routine(value: Date) {
    this.props.start_routine = value;
  }

  get end_routine() {
    return this.props.end_routine;
  }

  set end_routine(value: Date) {
    this.props.end_routine = value;
  }

  get start_backup() {
    return this.props.start_backup;
  }

  set start_backup(value: Date) {
    this.props.start_backup = value;
  }

  get end_backup() {
    return this.props.end_backup;
  }

  set end_backup(value: Date) {
    this.props.end_backup = value;
  }

  get start_compression() {
    return this.props.start_compression;
  }

  set start_compression(value: Date) {
    this.props.start_compression = value;
  }

  get end_compression() {
    return this.props.end_compression;
  }

  set end_compression(value: Date) {
    this.props.end_compression = value;
  }

  get start_send_cloud() {
    return this.props.start_send_cloud;
  }

  set start_send_cloud(value: Date) {
    this.props.start_send_cloud = value;
  }

  get end_send_cloud() {
    return this.props.end_send_cloud;
  }

  set end_send_cloud(value: Date) {
    this.props.end_send_cloud = value;
  }

  get situation() {
    return this.props.situation;
  }

  set situation(value: string) {
    this.props.situation = value;
  }

  get file_size() {
    return this.props.file_size;
  }

  set file_size(value: number) {
    this.props.file_size = value;
  }

  get deleted() {
    return this.props.deleted;
  }

  set deleted(value: boolean) {
    this.props.deleted = value;
  }

  get file_name() {
    return this.props.file_name;
  }

  set file_name(value: string) {
    this.props.file_name = value;
  }

  get observation() {
    return this.props.observation;
  }

  set observation(value: string) {
    this.props.observation = value;
  }

  get bucket_key() {
    return this.props.bucket_key;
  }

  set bucket_key(value: string) {
    this.props.bucket_key = value;
  }

  get created_at() {
    return this.props.created_at;
  }

  set created_at(value: Date) {
    this.props.created_at = value;
  }

  static create(props: ExecutedRoutinesProps, id?: UniqueEntityID) {
    const executedRoutines = new ExecutedRoutines(
      {
        ...props,
      },
      id,
    );

    return executedRoutines;
  }
}
