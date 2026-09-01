import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Guard to validate that the `id` route parameter exists and is valid.
 *
 * Unlike a Pipe, a Guard runs BEFORE the request reaches the controller.
 * It is useful for transversal validations or authentication/authorization.
 *
 * This guard can be applied:
 *  - At the method level: `@UseGuards(ValidIdGuard)`
 *  - At the controller level: `@UseGuards(ValidIdGuard)` on the whole class
 */
@Injectable()
export class ValidIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 1. Extract the HTTP context from the request
    const request = context.switchToHttp().getRequest<{ params: Record<string, string> }>();
    const params = request.params;

    // 2. Look up the 'id' parameter from the URL (e.g., /users/5)
    const id = params['id'];

    // 3. Special case: no id parameter (does not apply to this route),
    //    e.g., GET /users, POST /users (they have no :id).
    //    In that case the guard must allow the request through.
    if (id === undefined || id === null) {
      return true;
    }

    // 4. Validate that it is a positive integer
    // The regex `/^\d+$/` only accepts digits (0-9), without signs or decimals
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException("The 'id' parameter must be a valid integer (e.g., /users/5)");
    }

    // 5. Validate that it is greater than 0 (only positive ids)
    const numericId = Number(id);
    if (numericId <= 0) {
      throw new BadRequestException("The 'id' parameter must be a positive number greater than 0");
    }

    // If everything is valid, allow access to the handler
    return true;
  }
}
