import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;

export class CreateTimeSlotDto {
  @ApiProperty({ example: '09:00', description: 'Slot start time (HH:mm or HH:mm:ss)' })
  @IsNotEmpty({ message: 'startTime must not be empty' })
  @IsString({ message: 'startTime must be a string' })
  @Matches(TIME_PATTERN, { message: 'startTime must be a valid time in HH:mm or HH:mm:ss format' })
  startTime!: string;

  @ApiProperty({ example: '09:30', description: 'Slot end time (HH:mm or HH:mm:ss)' })
  @IsNotEmpty({ message: 'endTime must not be empty' })
  @IsString({ message: 'endTime must be a string' })
  @Matches(TIME_PATTERN, { message: 'endTime must be a valid time in HH:mm or HH:mm:ss format' })
  endTime!: string;
}
