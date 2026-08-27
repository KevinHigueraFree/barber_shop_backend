import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

/**
 * Payload to create the global scheduling settings.
 *
 * Only one record can ever exist, so this is only valid the first time.
 */
export class CreateSchedulingSettingDto {
  @ApiProperty({
    description: 'Duration in minutes that every time slot must have (e.g. 10, 15, 30)',
    example: 10,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'slotDurationMinutes must not be empty' })
  @IsInt({ message: 'slotDurationMinutes must be an integer' })
  @Min(1, { message: 'slotDurationMinutes must be greater than or equal to 1' })
  slotDurationMinutes!: number;
}
