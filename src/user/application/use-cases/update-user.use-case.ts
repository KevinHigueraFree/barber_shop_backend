import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UpdateUser } from '../../domain/entities/update-user';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository';
import { UpdateUserDto } from '../dtos/update-user.dto';
import {
  EntityNotFoundException,
  ConflictDomainException,
} from '../../domain/exceptions/domain.exception';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
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

    const updateUser = new UpdateUser(id, dto.name ?? existing.name, dto.email ?? existing.email);

    return this.userRepository.update(updateUser);
  }
}
