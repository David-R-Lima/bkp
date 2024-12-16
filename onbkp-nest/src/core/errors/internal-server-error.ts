import { UseCaseError } from 'src/core/errors/use-case-error';

export class InternalServerError extends Error implements UseCaseError {
  constructor(identifier?: string) {
    super(`Internal Server Error. ${identifier}`);
  }
}
