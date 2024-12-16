import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { DatabaseType } from '../../enums/databaseType';

export interface DatabaseProps {
  id_user: UniqueEntityID;
  database_description?: string;
  database_name?: string;
  database_type?: DatabaseType;
  server_name?: string;
  database_collection?: string;
  host?: string;
  port?: number;
  database_user?: string;
  database_password?: string;
  created_at?: Date;
  observation?: string;
  routines?: number;
  retentions?: number;
  status?: string;
  id_project: string;
}
export class Database extends Entity<DatabaseProps> {
  get id_user() {
    return this.props.id_user;
  }
  set id_user(value: UniqueEntityID) {
    this.props.id_user = value;
  }
  get database_description() {
    return this.props.database_description;
  }

  set database_description(value: string) {
    this.props.database_description = value;
  }

  get database_name() {
    return this.props.database_name;
  }

  set database_name(value: string) {
    this.props.database_name = value;
  }

  get database_type() {
    return this.props.database_type;
  }

  set database_type(value: DatabaseType) {
    this.props.database_type = value;
  }

  get database_collection() {
    return this.props.database_collection;
  }

  set database_collection(value: string) {
    this.props.database_collection = value;
  }

  get server_name() {
    return this.props.server_name;
  }

  set server_name(value: string) {
    this.props.server_name = value;
  }

  get host() {
    return this.props.host;
  }

  set host(value: string) {
    this.props.host = value;
  }

  get port() {
    return this.props.port;
  }

  set port(value: number) {
    this.props.port = value;
  }

  get database_user() {
    return this.props.database_user;
  }

  set database_user(value: string) {
    this.props.database_user = value;
  }

  get database_password() {
    return this.props.database_password;
  }

  set database_password(value: string) {
    this.props.database_password = value;
  }

  get created_at() {
    return this.props.created_at;
  }

  set created_at(value: Date) {
    this.props.created_at = value;
  }

  get observation() {
    return this.props.observation;
  }

  set observation(value: string) {
    this.props.observation = value;
  }

  get routines() {
    return this.props.routines;
  }

  set routines(value: number) {
    this.props.routines = value;
  }

  get retentions() {
    return this.props.retentions;
  }

  set retentions(value: number) {
    this.props.retentions = value;
  }

  get status() {
    return this.props.status;
  }

  set status(value: string) {
    this.props.status = value;
  }

  get id_project() {
    return this.props.id_project;
  }
  set id_project(value: string) {
    this.props.id_project = value;
  }

  static create(props: DatabaseProps, id?: UniqueEntityID) {
    const database = new Database(
      {
        ...props,
      },
      id,
    );

    return database;
  }
}
