import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Module identifier',
    example: 1,
  })
  @IsNotEmpty({ message: 'moduleId must not be empty' })
  @IsNumber({}, { message: 'moduleId must be a number' })
  moduleId!: number;

  @ApiProperty({
    description: 'Action identifier',
    example: 2,
  })
  @IsNotEmpty({ message: 'actionId must not be empty' })
  @IsNumber({}, { message: 'actionId must be a number' })
  actionId!: number;
}
