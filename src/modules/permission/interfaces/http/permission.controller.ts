import { Controller, Get } from '@nestjs/common';
import { ListPermissionsUseCase } from '@/modules/permission/application/use-cases/list-permissions.use-case';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly listPermissionsUseCase: ListPermissionsUseCase) {}

  @Get()
  findAll() {
    return this.listPermissionsUseCase.execute();
  }
}
