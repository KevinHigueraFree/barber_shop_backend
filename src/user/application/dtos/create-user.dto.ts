import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Juan Pérez',
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be string' })
  name!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'juan.perez@example.com',
  })
  @IsNotEmpty({ message: 'email must not be empty' })
  @IsEmail({}, { message: 'email must be an email' })
  email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'password must not be empty' })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password!: string;

  @ApiProperty({
    description: 'Role ID associated with the user (e.g., 1=Admin, 2=Staff, 3=Customer)',
    example: 3,
    required: true,
  })
  @IsNotEmpty({ message: 'roleId must not be empty' })
  @IsNumber({}, { message: 'roleId must be a number' })
  @Min(1, { message: 'roleId must be greater than or equal to 1' })
  roleId!: number;

  @ApiProperty({
    description: 'Indicates if the user is enabled',
    example: true,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'isEnabled must be a boolean' })
  isEnabled?: boolean;
}
