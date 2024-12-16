import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ExecutedRoutines } from './executed-routines';

export interface DatabaseRoutineProps {
  id_database: UniqueEntityID;
  id_user: UniqueEntityID;
  execution_time: Date;
  observation?: string;
  created_at: Date;
  active: boolean;
  executed_routines?: ExecutedRoutines[];
}
export class DatabaseRoutine extends Entity<DatabaseRoutineProps> {
  get id_database() {
    return this.props.id_database;
  }

  set id_database(value: UniqueEntityID) {
    this.props.id_database = value;
  }

  get id_user() {
    return this.props.id_user;
  }

  set id_user(value: UniqueEntityID) {
    this.props.id_user = value;
  }

  get execution_time() {
    return this.props.execution_time;
  }

  set execution_time(value: Date) {
    this.props.execution_time = value;
  }

  get observation() {
    return this.props.observation;
  }

  set observation(value: string) {
    this.props.observation = value;
  }

  get created_at() {
    return this.props.created_at;
  }

  set created_at(value: Date) {
    this.props.created_at = value;
  }

  get active() {
    return this.props.active;
  }
  set active(value: boolean) {
    this.props.active = value;
  }

  get executed_routines() {
    return this.props.executed_routines;
  }

  set executed_routines(value: ExecutedRoutines[]) {
    this.props.executed_routines = value;
  }

  static create(props: DatabaseRoutineProps, id?: UniqueEntityID) {
    const databaseRoutine = new DatabaseRoutine(
      {
        ...props,
      },
      id,
    );

    return databaseRoutine;
  }
}
