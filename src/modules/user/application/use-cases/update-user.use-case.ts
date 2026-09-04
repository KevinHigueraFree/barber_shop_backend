import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/modules/user/domain/entities/user.entity';
import { UpdateUser } from '@/modules/user/domain/entities/update-user';
import type { UserRepository } from '@/modules/user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@/modules/user/domain/repositories/user.repository';
import { UpdateUserDto } from '@/modules/user/application/dtos/update-user.dto';
import {
  EntityNotFoundException,
  ConflictDomainException,
} from '@/shared/domain/exceptions/domain.exception';
import {
  ROLE_REPOSITORY,
  type RoleRepository,
} from '@/modules/role/domain/repositories/role.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: number, dto: UpdateUserDto): Promise<User> {
    const existing = await this.userRepository.findById(id);
    if (!existing) {
      throw new EntityNotFoundException('User', id);
    }

    if (dto.email && dto.email !== existing.email) {
      const emailInUse = await this.userRepository.findByEmail(dto.email);
      if (emailInUse) {
        throw new ConflictDomainException('The email is already registered');
      }
    }

    const roleId = dto.roleId;
    if (roleId) {
      const existRole = await this.roleRepository.findById(roleId);
      if (!existRole) {
        throw new EntityNotFoundException('role', roleId);
      }
    }
    const updateUser = new UpdateUser(
      id,
      dto.name ?? existing.name,
      dto.email ?? existing.email,
      dto.password ?? existing.password,
      roleId ?? existing.roleId,
      dto.isEnabled ?? existing.isEnabled,
      dto.isCustomer ?? existing.isCustomer,
      dto.isStaff ?? existing.isStaff,
    );

    return this.userRepository.update(updateUser);
  }
}
