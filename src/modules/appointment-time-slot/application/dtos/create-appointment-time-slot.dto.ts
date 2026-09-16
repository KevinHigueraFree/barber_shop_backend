import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentTimeSlotDto {
  @ApiProperty({ description: 'ID of the appointment', example: 1 })
  @IsNotEmpty({ message: 'appointmentId must not be empty' })
  @Type(() => Number)
  @IsNumber({}, { message: 'appointmentId must be a number' })
  @Min(1, { message: 'appointmentId must be greater than or equal to 1' })
  appointmentId!: number;

  @ApiProperty({ description: 'ID of the time slot', example: 2 })
  @IsNotEmpty({ message: 'timeSlotId must not be empty' })
  @Type(() => Number)
  @IsNumber({}, { message: 'timeSlotId must be a number' })
  @Min(1, { message: 'timeSlotId must be greater than or equal to 1' })
  timeSlotId!: number;
}
