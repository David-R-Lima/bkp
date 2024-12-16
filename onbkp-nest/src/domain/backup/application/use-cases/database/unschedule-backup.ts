import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { InternalServerError } from 'src/core/errors/internal-server-error';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { InjectQueue } from '@nestjs/bull';
import { IDatabaseRoutineRepository } from 'src/domain/backup/enterprise/repositories/database-routines-repository';
import { Queue } from 'bull';

type BackupDatabaseResponse = Either<
  ResourceAlreadyExistsError | InternalServerError,
  null
>;

@Injectable()
export class UnscheduleBackupUseCase {
  constructor(
    private readonly databaseRoutines: IDatabaseRoutineRepository,
    @InjectQueue('backup') protected backupQueue: Queue,
  ) {}
  async execute(
    id_database: string,
    id_routine: string,
  ): Promise<BackupDatabaseResponse> {
    const routine = await this.databaseRoutines.findById(
      id_database,
      id_routine,
    );

    if (!routine) {
      return left(new ResourceNotFoundError('Routine not found'));
    }

    const jobs = await this.backupQueue.getJobs([
      'waiting',
      'active',
      'completed',
      'failed',
      'delayed',
    ]);

    // @ts-expect-error error sla
    const job = jobs.filter((job) => job.opts.repeat.jobId === id_routine);

    if (!job) {
      return left(new ResourceNotFoundError('Job not found'));
    }

    job.map((job) => job.remove());

    routine.active = false;

    await this.databaseRoutines.update(routine);

    return right(null);
  }
}
