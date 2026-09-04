import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/modules/user/domain/entities/user.entity';
import { NewUser } from '@/modules/user/domain/entities/new-user';
import type { UserRepository } from '@/modules/user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@/modules/user/domain/repositories/user.repository';
import { CreateUserDto } from '@/modules/user/application/dtos/create-user.dto';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';
import {
  ROLE_REPOSITORY,
  type RoleRepository,
} from '@/modules/role/domain/repositories/role.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictDomainException('The email is already registered');
    }

    const roleId = dto.roleId;
    if (roleId) {
      const existRole = await this.roleRepository.findById(roleId);
      if (!existRole) {
        throw new EntityNotFoundException('role', roleId);
      }
    }

    const newUser = new NewUser(
      dto.name,
      dto.email,
      dto.password,
      roleId,
      dto.isEnabled ?? true,
      dto.isCustomer ?? true,
      dto.isStaff ?? false,
    );
    return this.userRepository.create(newUser);
  }
}
