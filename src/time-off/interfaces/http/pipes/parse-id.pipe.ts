import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

/**
 * Custom pipe to validate the `id` route parameter.
 * Can be used instead of `ParseIntPipe` for full control over
 * error messages and validation rules.
 *
 * Validation rules:
 * - Must be present (required)
 * - Must be a number (integer)
 * - Must be positive (greater than 0)
 * - Must be an integer (not a decimal like 2.5)
 */
@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    // 1. Validate that the parameter is NOT empty or undefined
    if (value === undefined || value === null || value === '') {
      throw new BadRequestException(
        `The parameter '${metadata.data}' is required and cannot be empty`,
      );
    }

    // 2. Validate that it is a number (integer format without decimals)
    // The regex `/^\d+$/` only accepts digits 0-9 (whole numbers)
    if (!/^\d+$/.test(value)) {
      throw new BadRequestException(`The parameter '${metadata.data}' must be a valid integer`);
    }

    // 3. Convert to number (safe transformation)
    const id = Number(value);

    // 4. Validate that it is positive (greater than 0)
    // An id of 0 is not valid in most tables
    if (id <= 0) {
      throw new BadRequestException(
        `The parameter '${metadata.data}' must be a positive number greater than 0`,
      );
    }

    return id;
  }
}
