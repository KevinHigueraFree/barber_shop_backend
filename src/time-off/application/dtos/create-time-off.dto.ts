import { IsNotEmpty, IsNumber, IsString, IsDate, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeOffDto {
  @ApiProperty({
    description: 'ID of the staff member (user) taking time off',
    example: 5,
  })
  @IsNotEmpty({ message: 'staffId must not be empty' })
  @IsNumber({}, { message: 'staffId must be a number' })
  @Min(1, { message: 'staffId must be greater than or equal to 1' })
  staffId!: number;

  @ApiProperty({
    description: 'Reason for the time off or absence',
    example: 'Vacaciones de verano / Cita médica',
    maxLength: 200,
  })
  @IsNotEmpty({ message: 'reason must not be empty' })
  @IsString({ message: 'reason must be a string' })
  @MaxLength(200, { message: 'reason must be shorter than or equal to 200 characters' })
  reason!: string;

  @ApiProperty({
    description: 'Start date and time of the absence',
    example: '2026-06-01T09:00:00.000Z',
  })
  @IsNotEmpty({ message: 'startDatetime must not be empty' })
  @Type(() => Date)
  @IsDate({ message: 'startDatetime must be a valid date' })
  startDatetime!: Date;

  @ApiProperty({
    description: 'End date and time of the absence',
    example: '2026-06-07T18:00:00.000Z',
  })
  @IsNotEmpty({ message: 'endDatetime must not be empty' })
  @Type(() => Date)
  @IsDate({ message: 'endDatetime must be a valid date' })
  endDatetime!: Date;
}
