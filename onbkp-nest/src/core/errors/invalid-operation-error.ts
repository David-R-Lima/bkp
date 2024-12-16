import { UseCaseError } from 'src/core/errors/use-case-error';

export class InvalidOperationError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Inavlid operation error. Details: ${identifier}`);
  }
}
