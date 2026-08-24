import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { DomainException } from '@/shared/domain/exceptions/domain.exception';

interface ErrorResponseBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

/**
 * Global filter that converts ANY error (HTTP or domain) into the
 * standard ApiErrorResponse shape.
 *
 * Simple design: controllers and use-cases throw HttpExceptions or
 * DomainExceptions, and this filter maps them to:
 * {
 *   success: false,
 *   error: { code, message, details? },
 *   meta: { timestamp, path, statusCode }
 * }
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.getStatus(exception);
    const errorBody = this.buildError(exception);

    if (status >= 500) {
      this.logger.error(
        `Error on ${request.method} ${request.url}: ${exception instanceof Error ? exception.stack : String(exception)}`,
      );
    }

    response.status(status).json({
      success: false,
      error: errorBody,
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
        statusCode: status,
      },
    });
  }

  private getStatus(exception: unknown): number {
    if (exception instanceof DomainException) {
      return exception.statusCode;
    }
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    if (this.isUniqueConstraintError(exception)) {
      return HttpStatus.CONFLICT;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private buildError(exception: unknown) {
    // Domain exceptions → custom error code
    if (exception instanceof DomainException) {
      const details: unknown = exception.details;
      return {
        code: exception.code,
        message: exception.message,
        ...(details !== undefined ? { details } : {}),
      };
    }

    // NestJS HTTP exceptions (BadRequest, NotFound, ValidationPipe, etc.)
    if (exception instanceof HttpException) {
      const body = exception.getResponse();

      // If body.message is an array → ValidationPipe error with field details
      if (typeof body === 'object' && body !== null) {
        const bodyObj = body as ErrorResponseBody;
        if (Array.isArray(bodyObj.message)) {
          const messages: string[] = bodyObj.message;
          return {
            code: 'VALIDATION_ERROR',
            message: 'Sent data not valid',
            details: messages.map((msg) => {
              const firstSpace = msg.indexOf(' ');
              return {
                field: firstSpace > -1 ? msg.slice(0, firstSpace) : msg,
                message: firstSpace > -1 ? msg.slice(firstSpace + 1) : msg,
              };
            }),
          };
        }
      }

      const message =
        typeof body === 'string'
          ? body
          : ((body as ErrorResponseBody).message ?? exception.message);

      return { code: 'HTTP_ERROR', message };
    }

    if (this.isUniqueConstraintError(exception)) {
      return {
        code: 'CONFLICT',
        message: 'The value is already registered',
      };
    }

    // Unknown / unhandled errors
    return {
      code: 'INTERNAL_ERROR',
      message: 'Error interno del servidor',
    };
  }

  private isUniqueConstraintError(exception: unknown): boolean {
    return (
      exception instanceof QueryFailedError &&
      (exception as QueryFailedError & { driverError?: { code?: string } }).driverError?.code ===
        '23505'
    );
  }
}
