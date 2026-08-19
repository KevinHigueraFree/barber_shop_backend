/**
 * Standard success response wrapper for all API endpoints.
 *
 * The global TransformInterceptor wraps every successful request.
 */
export interface ApiResponse<T> {
  success: true;
  data: T;
  meta: {
    timestamp: string;
    path: string;
  };
}

/**
 * Standard error response wrapper for all API endpoints.
 *
 * The global HttpExceptionFilter converts every error.
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  meta: {
    timestamp: string;
    path: string;
    statusCode: number;
  };
}
