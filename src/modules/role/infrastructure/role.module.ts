import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateRoleUseCase } from '@/modules/role/application/use-cases/create-role.use-case';
import { DeleteRoleUseCase } from '@/modules/role/application/use-cases/delete-role.use-case';
import { GetRoleUseCase } from '@/modules/role/application/use-cases/get-role.use-case';
import { GetRolePermissionsUseCase } from '@/modules/role/application/use-cases/get-role-permissions.use-case';
import { ListRolesUseCase } from '@/modules/role/application/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from '@/modules/role/application/use-cases/update-role.use-case';
import { ROLE_REPOSITORY } from '@/modules/role/domain/repositories/role.repository';
import { TypeOrmRoleEntity } from '@/modules/role/infrastructure/persistence/typeorm-role.entity';
import { TypeOrmRoleRepository } from '@/modules/role/infrastructure/persistence/typeorm-role.repository';
import { RoleController } from '@/modules/role/interfaces/http/role.controller';
import { RolePermissionModule } from '@/modules/role-permission/infrastructure/role-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmRoleEntity]), forwardRef(() => RolePermissionModule)],
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    GetRoleUseCase,
    GetRolePermissionsUseCase,
    ListRolesUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    {
      provide: ROLE_REPOSITORY,
      useClass: TypeOrmRoleRepository,
    },
  ],
  exports: [ROLE_REPOSITORY],
})
export class RoleModule {}
