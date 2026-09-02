import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRoleDto } from '@/role/application/dtos/create-role.dto';
import { UpdateRoleDto } from '@/role/application/dtos/update-role.dto';
import { CreateRoleUseCase } from '@/role/application/use-cases/create-role.use-case';
import { DeleteRoleUseCase } from '@/role/application/use-cases/delete-role.use-case';
import { GetRoleUseCase } from '@/role/application/use-cases/get-role.use-case';
import { ListRolesUseCase } from '@/role/application/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from '@/role/application/use-cases/update-role.use-case';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly getRoleUseCase: GetRoleUseCase,
    private readonly listRolesUseCase: ListRolesUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.createRoleUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listRolesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getRoleUseCase.execute(id);
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateRoleDto) {
    return this.updateRoleUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteRoleUseCase.execute(id);
  }
}
