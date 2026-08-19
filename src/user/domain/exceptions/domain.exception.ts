/**
 * Base class for all application domain exceptions.
 *
 * These exceptions are thrown from the domain/application layer and
 * mapped to the ApiErrorResponse shape by the global HttpExceptionFilter.
 */
export class DomainException extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 500,
    public readonly details?: any,
  ) {
    super(message);
    this.name = 'DomainException';
  }
}

/**
 * Thrown when a requested entity does not exist (maps to 404).
 */
export class EntityNotFoundException extends DomainException {
  constructor(entity: string, id?: string | number, message?: string) {
    super(
      `${entity.toUpperCase()}_NOT_FOUND`,
      message ?? `${entity} with id ${id} was not found`,
      404,
    );
    this.name = 'EntityNotFoundException';
  }
}

/**
 * Thrown when the data provided does not meet validation/business rules (maps to 400).
 */
export class ValidationException extends DomainException {
  constructor(message: string, details?: any) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationException';
  }
}

/**
 * Thrown when a business rule / conflict occurs (maps to 409).
 */
export class ConflictDomainException extends DomainException {
  constructor(message: string, details?: any) {
    super('CONFLICT', message, 409, details);
    this.name = 'ConflictDomainException';
  }
}
