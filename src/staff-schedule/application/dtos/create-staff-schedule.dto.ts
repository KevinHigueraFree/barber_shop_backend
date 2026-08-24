import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, Matches, IsNumber, Min } from 'class-validator';

const timePattern = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

export class CreateStaffScheduleDto {
  @ApiProperty({ description: 'ID of the staff member', example: 5 })
  @IsNotEmpty({ message: 'staffId must not be empty' })
  @IsNumber({}, { message: 'staffId must be a number' })
  @Min(1, { message: 'staffId must be greater than or equal to 1' })
  staffId!: number;

  @ApiProperty({
    description: 'Date representing the scheduled day',
    example: '2026-06-01',
  })
  @IsNotEmpty({ message: 'dayOfWeek must not be empty' })
  @Type(() => Date)
  @IsDate({ message: 'dayOfWeek must be a valid date' })
  dayOfWeek!: Date;

  @ApiProperty({ description: 'Work start time', example: '09:00:00' })
  @IsNotEmpty({ message: 'workStartTime must not be empty' })
  @IsString({ message: 'workStartTime must be a string' })
  @Matches(timePattern, { message: 'workStartTime must be a valid time' })
  workStartTime!: string;

  @ApiProperty({ description: 'Work end time', example: '18:00:00' })
  @IsNotEmpty({ message: 'workEndTime must not be empty' })
  @IsString({ message: 'workEndTime must be a string' })
  @Matches(timePattern, { message: 'workEndTime must be a valid time' })
  workEndTime!: string;

  @ApiPropertyOptional({ description: 'Break start time', example: '13:00:00' })
  @IsOptional()
  @IsString({ message: 'breakStartTime must be a string' })
  @Matches(timePattern, { message: 'breakStartTime must be a valid time' })
  breakStartTime?: string;

  @ApiPropertyOptional({ description: 'Break end time', example: '14:00:00' })
  @IsOptional()
  @IsString({ message: 'breakEndTime must be a string' })
  @Matches(timePattern, { message: 'breakEndTime must be a valid time' })
  breakEndTime?: string;
}
