import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

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
  @MaxLength(250, { message: 'description must not exceed 250 characters' })
  description?: string | null;

  @ApiProperty({
    description:
      'HEX color code used to display the status. It accepts #RGB, #RGBA, #RRGGBB or #RRGGBBAA. It will be stored as 6 or 8 characters without the "#" prefix.',
    example: '#3B82F6',
    required: false,
    default: 'CCCCCC',
  })
  @IsOptional()
  @IsString({ message: 'colorCode must be a string' })
  @Transform(({ value }: { value: unknown }) => {
    if (typeof value !== 'string') return value;

    let clean = value.replace(/^#/, '').trim();

    if (clean.length === 3 || clean.length === 4) {
      clean = clean
        .split('')
        .map((char) => char + char)
        .join('');
    }

    return clean.toUpperCase();
  })
  @Matches(/^[0-9A-F]{6}$|^[0-9A-F]{8}$/, {
    message:
      'colorCode must be a valid HEX color code of 6 or 8 alphanumeric characters (without #)',
  })
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
