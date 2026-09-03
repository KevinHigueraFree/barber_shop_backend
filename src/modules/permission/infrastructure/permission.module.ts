import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionModule } from '@/modules/action/infrastructure/action.module';
import { ModuleModule } from '@/modules/module/infrastructure/module.module';
import { ListPermissionsUseCase } from '@/modules/permission/application/use-cases/list-permissions.use-case';
import { PERMISSION_REPOSITORY } from '@/modules/permission/domain/repositories/permission.repository';
import { TypeOrmPermissionEntity } from '@/modules/permission/infrastructure/persistence/typeorm-permission.entity';
import { TypeOrmPermissionRepository } from '@/modules/permission/infrastructure/persistence/typeorm-permission.repository';
import { PermissionController } from '@/modules/permission/interfaces/http/permission.controller';
import { TypeOrmRolePermissionEntity } from '@/modules/role-permission/infrastructure/persistence/typeorm-role-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmPermissionEntity, TypeOrmRolePermissionEntity]),
    ModuleModule,
    ActionModule,
  ],
  controllers: [PermissionController],
  providers: [
    ListPermissionsUseCase,
    {
      provide: PERMISSION_REPOSITORY,
      useClass: TypeOrmPermissionRepository,
    },
  ],
  exports: [PERMISSION_REPOSITORY],
})
export class PermissionModule {}
