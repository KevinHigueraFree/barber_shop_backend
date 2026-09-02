import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from '@/role/application/dtos/create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
