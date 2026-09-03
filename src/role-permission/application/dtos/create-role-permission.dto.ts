import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRolePermissionDto {
  @ApiProperty({
    description: 'Role identifier',
    example: 1,
  })
  @IsNotEmpty({ message: 'roleId must not be empty' })
  @IsNumber({}, { message: 'roleId must be a number' })
  roleId!: number;

  @ApiProperty({
    description: 'Permission identifier',
    example: 1,
  })
  @IsNotEmpty({ message: 'permissionId must not be empty' })
  @IsNumber({}, { message: 'permissionId must be a number' })
  permissionId!: number;
}
