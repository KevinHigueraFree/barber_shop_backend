import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '@/modules/role/application/dtos/create-role.dto';
import { NewRole } from '@/modules/role/domain/entities/new-role';
import { Role } from '@/modules/role/domain/entities/role.entity';
import {
  ROLE_REPOSITORY,
  type RoleRepository,
} from '@/modules/role/domain/repositories/role.repository';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(dto: CreateRoleDto): Promise<Role> {
    const existing = await this.roleRepository.findByName(dto.name);
    if (existing) {
      throw new ConflictDomainException('The role name is already registered');
    }

    return this.roleRepository.create(new NewRole(dto.name, dto.description ?? null));
  }
}
