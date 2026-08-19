import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Service name',
    example: 'Top Face',
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be string' })
  name!: string;

  @ApiProperty({
    description: 'Service description',
    example: 'Top Face i a new cut',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description must be string' })
  description!: string;

  @ApiProperty({
    description: 'Service price',
    example: 102.33,
  })
  @IsNotEmpty({ message: 'price must not be empty' })
  @Type(() => Number)
  @IsNumber({}, { message: 'price must be a number' })
  @Min(0, { message: 'price must be greater than or equal to 0' })
  price!: number;
}
