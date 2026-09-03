import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionModule } from '@/action/infrastructure/action.module';
import { ModuleModule } from '@/module/infrastructure/module.module';
import { ListPermissionsUseCase } from '@/permission/application/use-cases/list-permissions.use-case';
import { PERMISSION_REPOSITORY } from '@/permission/domain/repositories/permission.repository';
import { TypeOrmPermissionEntity } from '@/permission/infrastructure/persistence/typeorm-permission.entity';
import { TypeOrmPermissionRepository } from '@/permission/infrastructure/persistence/typeorm-permission.repository';
import { PermissionController } from '@/permission/interfaces/http/permission.controller';
import { TypeOrmRolePermissionEntity } from '@/role-permission/infrastructure/persistence/typeorm-role-permission.entity';

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
