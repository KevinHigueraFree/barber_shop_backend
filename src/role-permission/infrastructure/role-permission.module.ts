import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from '@/permission/infrastructure/permission.module';
import { RoleModule } from '@/role/infrastructure/role.module';
import { CreateRolePermissionUseCase } from '@/role-permission/application/use-cases/create-role-permission.use-case';
import { DeleteRolePermissionUseCase } from '@/role-permission/application/use-cases/delete-role-permission.use-case';
import { GetRolePermissionUseCase } from '@/role-permission/application/use-cases/get-role-permission.use-case';
import { ListRolePermissionsUseCase } from '@/role-permission/application/use-cases/list-role-permissions.use-case';
import { ROLE_PERMISSION_REPOSITORY } from '@/role-permission/domain/repositories/role-permission.repository';
import { TypeOrmRolePermissionEntity } from '@/role-permission/infrastructure/persistence/typeorm-role-permission.entity';
import { TypeOrmRolePermissionRepository } from '@/role-permission/infrastructure/persistence/typeorm-role-permission.repository';
import { RolePermissionController } from '@/role-permission/interfaces/http/role-permission.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmRolePermissionEntity]),
    forwardRef(() => RoleModule),
    PermissionModule,
  ],
  controllers: [RolePermissionController],
  providers: [
    CreateRolePermissionUseCase,
    GetRolePermissionUseCase,
    ListRolePermissionsUseCase,
    DeleteRolePermissionUseCase,
    {
      provide: ROLE_PERMISSION_REPOSITORY,
      useClass: TypeOrmRolePermissionRepository,
    },
  ],
  exports: [ROLE_PERMISSION_REPOSITORY],
})
export class RolePermissionModule {}
