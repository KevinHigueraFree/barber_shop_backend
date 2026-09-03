import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateRolePermissionDto } from '@/modules/role-permission/application/dtos/create-role-permission.dto';
import { CreateRolePermissionUseCase } from '@/modules/role-permission/application/use-cases/create-role-permission.use-case';
import { DeleteRolePermissionUseCase } from '@/modules/role-permission/application/use-cases/delete-role-permission.use-case';
import { GetRolePermissionUseCase } from '@/modules/role-permission/application/use-cases/get-role-permission.use-case';
import { ListRolePermissionsUseCase } from '@/modules/role-permission/application/use-cases/list-role-permissions.use-case';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';

@Controller('role-permissions')
export class RolePermissionController {
  constructor(
    private readonly createRolePermissionUseCase: CreateRolePermissionUseCase,
    private readonly getRolePermissionUseCase: GetRolePermissionUseCase,
    private readonly listRolePermissionsUseCase: ListRolePermissionsUseCase,
    private readonly deleteRolePermissionUseCase: DeleteRolePermissionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateRolePermissionDto) {
    return this.createRolePermissionUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listRolePermissionsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getRolePermissionUseCase.execute(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteRolePermissionUseCase.execute(id);
  }
}
