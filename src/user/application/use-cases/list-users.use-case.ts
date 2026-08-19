import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/user/domain/entities/user.entity';
import type { UserRepository } from '@/user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@/user/domain/repositories/user.repository';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
