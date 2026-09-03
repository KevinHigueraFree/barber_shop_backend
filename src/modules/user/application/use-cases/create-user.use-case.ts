import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/modules/user/domain/entities/user.entity';
import { NewUser } from '@/modules/user/domain/entities/new-user';
import type { UserRepository } from '@/modules/user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@/modules/user/domain/repositories/user.repository';
import { CreateUserDto } from '@/modules/user/application/dtos/create-user.dto';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictDomainException('The email is already registered');
    }

    const newUser = new NewUser(
      dto.name,
      dto.email,
      dto.password,
      dto.roleId,
      dto.isEnabled ?? true,
      dto.isCustomer ?? true,
      dto.isStaff ?? false,
    );
    return this.userRepository.create(newUser);
  }
}
