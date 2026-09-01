import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActionDto {
  @ApiProperty({
    description: 'Action name',
    example: 'Create',
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  name!: string;
}
