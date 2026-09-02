import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    example: 'Administrator',
    maxLength: 45,
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  @MaxLength(45, { message: 'name must not exceed 45 characters' })
  name!: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Full access to the barber shop administration',
    maxLength: 200,
  })
  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description must be a string' })
  @MaxLength(200, { message: 'description must not exceed 200 characters' })
  description!: string;
}
