import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentServiceDto {
  @ApiProperty({ description: 'ID of the appointment', example: 1 })
  @IsNotEmpty({ message: 'appointmentId must not be empty' })
  @Type(() => Number)
  @IsNumber({}, { message: 'appointmentId must be a number' })
  @Min(1, { message: 'appointmentId must be greater than or equal to 1' })
  appointmentId!: number;

  @ApiProperty({ description: 'ID of the service included in the appointment', example: 2 })
  @IsNotEmpty({ message: 'serviceId must not be empty' })
  @Type(() => Number)
  @IsNumber({}, { message: 'serviceId must be a number' })
  @Min(1, { message: 'serviceId must be greater than or equal to 1' })
  serviceId!: number;

  @ApiProperty({ description: 'Service price agreed when booking the appointment', example: 25.5 })
  @IsNotEmpty({ message: 'priceAtService must not be empty' })
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'priceAtService must be a number with up to 2 decimal places' },
  )
  @Min(0, { message: 'priceAtService must be greater than or equal to 0' })
  priceAtService!: number;

  @ApiProperty({ description: 'Number of units of the service', example: 1 })
  @IsNotEmpty({ message: 'quantity must not be empty' })
  @Type(() => Number)
  @IsInt({ message: 'quantity must be an integer' })
  @Min(1, { message: 'quantity must be greater than or equal to 1' })
  quantity!: number;
}
