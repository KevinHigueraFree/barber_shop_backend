import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    example: '2026-06-01',
    description: 'Appointment date in ISO format',
  })
  @IsNotEmpty({ message: 'date must not be empty' })
  @Type(() => Date)
  @IsDate({ message: 'date must be a valid date' })
  date!: Date;

  @ApiProperty({ example: 5, description: 'Staff user ID' })
  @IsNotEmpty({ message: 'staffId must not be empty' })
  @IsNumber({}, { message: 'staffId must be a number' })
  @Min(1, { message: 'staffId must be greater than or equal to 1' })
  staffId!: number;

  @ApiProperty({ example: 10, description: 'Customer user ID' })
  @IsNotEmpty({ message: 'customerId must not be empty' })
  @IsNumber({}, { message: 'customerId must be a number' })
  @Min(1, { message: 'customerId must be greater than or equal to 1' })
  customerId!: number;

  @ApiProperty({ example: 1, description: 'Appointment status ID' })
  @IsNotEmpty({ message: 'statusId must not be empty' })
  @IsNumber({}, { message: 'statusId must be a number' })
  @Min(1, { message: 'statusId must be greater than or equal to 1' })
  statusId!: number;
}
