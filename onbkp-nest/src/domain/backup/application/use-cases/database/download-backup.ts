import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { InternalServerError } from 'src/core/errors/internal-server-error';
import { ResourceAlreadyExistsError } from 'src/core/errors/resource-already-exists-error';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { IExecutedRoutinesRepository } from 'src/domain/backup/enterprise/repositories/executed-routine-repository';
import { Uploader } from '../../storage/uploader';
import { InvalidOperationError } from 'src/core/errors/invalid-operation-error';

type DownloadBackupResponse = Either<
  ResourceAlreadyExistsError | InternalServerError | InvalidOperationError,
  { file: Buffer }
>;

@Injectable()
export class DownloadBackupUseCase {
  constructor(
    private readonly executedRoutineRepository: IExecutedRoutinesRepository,
    private readonly s3: Uploader,
  ) {}
  async execute(
    id_routine: string,
    id_executed_routine: string,
  ): Promise<DownloadBackupResponse> {
    const res = await this.executedRoutineRepository.findById(
      id_routine,
      id_executed_routine,
    );

    if (!res) {
      return left(new ResourceNotFoundError('Database not found'));
    }

    if (res.deleted) {
      return left(new InvalidOperationError('File was deleted'));
    }

    try {
      const file = await this.s3.fetch(res.file_name);

      const fileBuffer = Buffer.from(file);

      return right({
        file: fileBuffer,
      });
    } catch (error) {
      return left(new InternalServerError(error.message));
    }
  }
}