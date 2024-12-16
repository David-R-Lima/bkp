import { UseCaseError } from './use-case-error';

export class RequiredFieldError extends Error implements UseCaseError {
  constructor(field: string) {
    super(`Required field: ${field}`);
  }
}
