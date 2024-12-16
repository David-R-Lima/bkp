import { ExecutedRoutines } from 'src/domain/backup/enterprise/entities/executed-routines';

export class ExecutedRoutinePresenter {
  static toHTTP(executedRoutines: ExecutedRoutines) {
    return {
      id_executed_routine: executedRoutines.id.toString(),
      id_routine: executedRoutines.id_routine.toString(),
      time_to_start: executedRoutines.time_to_start,
      start_routine: executedRoutines.start_routine,
      end_routine: executedRoutines.end_routine,
      start_backup: executedRoutines.start_backup,
      end_backup: executedRoutines.end_backup,
      start_compression: executedRoutines.start_compression,
      end_compression: executedRoutines.end_compression,
      start_send_cloud: executedRoutines.start_send_cloud,
      end_send_cloud: executedRoutines.end_send_cloud,
      situation: executedRoutines.situation,
      file_size: executedRoutines.file_size,
      deleted: executedRoutines.deleted,
      file_name: executedRoutines.file_name,
      observation: executedRoutines.observation,
      bucket_key: executedRoutines.bucket_key,
      created_at: executedRoutines.created_at,
    };
  }
}
