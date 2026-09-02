import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateRoleUseCase } from '@/role/application/use-cases/create-role.use-case';
import { DeleteRoleUseCase } from '@/role/application/use-cases/delete-role.use-case';
import { GetRoleUseCase } from '@/role/application/use-cases/get-role.use-case';
import { ListRolesUseCase } from '@/role/application/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from '@/role/application/use-cases/update-role.use-case';
import { ROLE_REPOSITORY } from '@/role/domain/repositories/role.repository';
import { TypeOrmRoleEntity } from '@/role/infrastructure/persistence/typeorm-role.entity';
import { TypeOrmRoleRepository } from '@/role/infrastructure/persistence/typeorm-role.repository';
import { RoleController } from '@/role/interfaces/http/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmRoleEntity])],
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    GetRoleUseCase,
    ListRolesUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    {
      provide: ROLE_REPOSITORY,
      useClass: TypeOrmRoleRepository,
    },
  ],
})
export class RoleModule {}
