import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAppointmentStatusDto {
  @ApiProperty({
    description: 'Appointment status name (unique)',
    example: 'Pending',
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name must be a string' })
  name!: string;

  @ApiProperty({
    description: 'Optional explanation of what the status means',
    example: 'Appointment created but not confirmed yet',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string | null;

  @ApiProperty({
    description: 'HEX color code used to display the status (e.g. in the calendar)',
    example: '#3B82F6',
    required: false,
    default: '#CCCCCC',
  })
  @IsOptional()
  @IsHexColor({ message: 'colorCode must be a valid HEX color (e.g. #RRGGBB)' })
  @MaxLength(7, { message: 'colorCode must have at most 7 characters (#RRGGBB)' })
  colorCode?: string;

  @ApiProperty({
    description: 'Whether the status can be selected when creating an appointment',
    example: true,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'isEnabled must be a boolean' })
  isEnabled?: boolean;
}
