import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository';
import { EntityNotFoundException } from '../../domain/exceptions/domain.exception';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number): Promise<User> {
    const user = await this.userRepository.deleteById(id);
    if (!user) {
      throw new EntityNotFoundException('User', id);
    }
    return user;
  }
}
