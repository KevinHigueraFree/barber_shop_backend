import { Inject, Injectable } from '@nestjs/common';
import { UpdateRoleDto } from '@/modules/role/application/dtos/update-role.dto';
import { Role } from '@/modules/role/domain/entities/role.entity';
import { UpdateRole } from '@/modules/role/domain/entities/update-role';
import {
  ROLE_REPOSITORY,
  type RoleRepository,
} from '@/modules/role/domain/repositories/role.repository';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: number, dto: UpdateRoleDto): Promise<Role> {
    const existing = await this.roleRepository.findById(id);
    if (!existing) {
      throw new EntityNotFoundException('Role', id);
    }

    const targetName = dto.name ?? existing.name;
    if (targetName !== existing.name) {
      const duplicated = await this.roleRepository.findByName(targetName);
      if (duplicated && duplicated.id !== id) {
        throw new ConflictDomainException('The role name is already registered');
      }
    }

    return this.roleRepository.update(
      new UpdateRole(id, targetName, dto.description ?? existing.description),
    );
  }
}
