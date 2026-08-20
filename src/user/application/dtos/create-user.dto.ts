import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
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
    description: 'Indicates if the user is an admin',
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isAdmin must be a boolean' })
  isAdmin?: boolean;

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
