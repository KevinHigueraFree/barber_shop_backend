import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionModule } from '@/action/infrastructure/action.module';
import { ModuleModule } from '@/module/infrastructure/module.module';
import { CreatePermissionUseCase } from '@/permission/application/use-cases/create-permission.use-case';
import { DeletePermissionUseCase } from '@/permission/application/use-cases/delete-permission.use-case';
import { GetPermissionUseCase } from '@/permission/application/use-cases/get-permission.use-case';
import { ListPermissionsUseCase } from '@/permission/application/use-cases/list-permissions.use-case';
import { PERMISSION_REPOSITORY } from '@/permission/domain/repositories/permission.repository';
import { TypeOrmPermissionEntity } from '@/permission/infrastructure/persistence/typeorm-permission.entity';
import { TypeOrmPermissionRepository } from '@/permission/infrastructure/persistence/typeorm-permission.repository';
import { PermissionController } from '@/permission/interfaces/http/permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmPermissionEntity]), ModuleModule, ActionModule],
  controllers: [PermissionController],
  providers: [
    CreatePermissionUseCase,
    GetPermissionUseCase,
    ListPermissionsUseCase,
    DeletePermissionUseCase,
    {
      provide: PERMISSION_REPOSITORY,
      useClass: TypeOrmPermissionRepository,
    },
  ],
  exports: [PERMISSION_REPOSITORY],
})
export class PermissionModule {}
