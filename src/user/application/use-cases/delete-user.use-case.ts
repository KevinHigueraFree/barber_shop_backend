import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/user/domain/entities/user.entity';
import type { UserRepository } from '@/user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@/user/domain/repositories/user.repository';
import { EntityNotFoundException } from '@/user/domain/exceptions/domain.exception';

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
