import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';
import { CreatePermissionDto } from '@/permission/application/dtos/create-permission.dto';
import { CreatePermissionUseCase } from '@/permission/application/use-cases/create-permission.use-case';
import { DeletePermissionUseCase } from '@/permission/application/use-cases/delete-permission.use-case';
import { GetPermissionUseCase } from '@/permission/application/use-cases/get-permission.use-case';
import { ListPermissionsUseCase } from '@/permission/application/use-cases/list-permissions.use-case';

@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly getPermissionUseCase: GetPermissionUseCase,
    private readonly listPermissionsUseCase: ListPermissionsUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.createPermissionUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listPermissionsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getPermissionUseCase.execute(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deletePermissionUseCase.execute(id);
  }
}
