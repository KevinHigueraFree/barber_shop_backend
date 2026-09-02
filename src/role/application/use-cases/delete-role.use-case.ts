import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@/role/domain/entities/role.entity';
import { ROLE_REPOSITORY, type RoleRepository } from '@/role/domain/repositories/role.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: number): Promise<Role> {
    const deleted = await this.roleRepository.deleteById(id);
    if (!deleted) {
      throw new EntityNotFoundException('role', id);
    }

    return deleted;
  }
}
