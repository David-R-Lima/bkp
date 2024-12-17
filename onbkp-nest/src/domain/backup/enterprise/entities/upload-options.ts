import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export enum UploadType {
  s3 = 's3',
  local = 'local',
}

export interface UploadOptionProps {
  uploadType: UploadType;
  id_user: UniqueEntityID;
}
export class UploadOptions extends Entity<UploadOptionProps> {
  get uploadType() {
    return this.props.uploadType;
  }
  set uploadType(value: UploadType) {
    this.props.uploadType = value;
  }
  get id_user() {
    return this.props.id_user;
  }
  set id_user(value: UniqueEntityID) {
    this.props.id_user = value;
  }
  static create(props: UploadOptionProps, id?: UniqueEntityID) {
    const uploadOptions = new UploadOptions(
      {
        ...props,
      },
      id,
    );

    return uploadOptions;
  }
}
