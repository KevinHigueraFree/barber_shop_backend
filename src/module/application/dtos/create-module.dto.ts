import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({
    description: 'Module name',
    example: 'Users',
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  name!: string;
}
