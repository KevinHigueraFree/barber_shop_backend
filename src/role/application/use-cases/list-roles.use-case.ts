import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@/role/domain/entities/role.entity';
import { ROLE_REPOSITORY, type RoleRepository } from '@/role/domain/repositories/role.repository';

@Injectable()
export class ListRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }
}
