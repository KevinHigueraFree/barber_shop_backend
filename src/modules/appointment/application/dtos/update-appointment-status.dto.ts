import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateAppointmentStatusDto {
  @ApiProperty({ example: 2, description: 'New appointment status ID' })
  @IsNotEmpty({ message: 'statusId must not be empty' })
  @IsNumber({}, { message: 'statusId must be a number' })
  @Min(1, { message: 'statusId must be greater than or equal to 1' })
  statusId!: number;
}
