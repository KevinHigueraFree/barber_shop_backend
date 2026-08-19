import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
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
}
