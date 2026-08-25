import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Service name',
    example: 'Top Face',
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  name!: string;

  @ApiProperty({
    description: 'Service description',
    example: 'Top Face is a new cut',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'Service price',
    example: 102.33,
  })
  @IsNotEmpty({ message: 'price must not be empty' })
  @Type(() => Number)
  @IsNumber({}, { message: 'price must be a number' })
  @Min(0, { message: 'price must be greater than or equal to 0' })
  price!: number;

  @ApiProperty({
    description: 'Service duration in minutes',
    example: 60,
  })
  @IsNotEmpty({ message: 'duration must not be empty' })
  @Type(() => Number)
  @IsNumber({}, { message: 'duration must be a number' })
  @Min(1, { message: 'duration must be greater than or equal to 1' })
  @Max(600, { message: 'duration must be less than or equal to 600' })
  duration!: number;
}
