import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@/shared/interfaces/api-response.interface';

/**
 * Global interceptor that wraps every successful response in the standard
 * ApiResponse<T> shape:
 * { success: true, data, meta: { timestamp, path } }
 *
 * Controllers return "pure" data (entities or DTOs) — no manual wrapping needed.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((data) => ({
        success: true as const,
        data,
        meta: {
          timestamp: new Date().toISOString(),
          path: request.url,
        },
      })),
    );
  }
}
