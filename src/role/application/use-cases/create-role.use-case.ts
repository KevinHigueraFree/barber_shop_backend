import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '@/role/application/dtos/create-role.dto';
import { NewRole } from '@/role/domain/entities/new-role';
import { Role } from '@/role/domain/entities/role.entity';
import { ROLE_REPOSITORY, type RoleRepository } from '@/role/domain/repositories/role.repository';
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

    return this.roleRepository.create(new NewRole(dto.name, dto.description));
  }
}
