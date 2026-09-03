import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStaffServiceDto {
  @ApiProperty({ description: 'ID of the staff member', example: 5 })
  @IsNotEmpty({ message: 'staffId must not be empty' })
  @Type(() => Number)
  @IsNumber({}, { message: 'staffId must be a number' })
  @Min(1, { message: 'staffId must be greater than or equal to 1' })
  staffId!: number;

  @ApiProperty({ description: 'ID of the service assigned to the staff member', example: 2 })
  @IsNotEmpty({ message: 'serviceId must not be empty' })
  @Type(() => Number)
  @IsNumber({}, { message: 'serviceId must be a number' })
  @Min(1, { message: 'serviceId must be greater than or equal to 1' })
  serviceId!: number;
}
