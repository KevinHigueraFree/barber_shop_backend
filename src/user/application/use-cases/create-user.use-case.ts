import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/user/domain/entities/user.entity';
import { NewUser } from '@/user/domain/entities/new-user';
import type { UserRepository } from '@/user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@/user/domain/repositories/user.repository';
import { CreateUserDto } from '@/user/application/dtos/create-user.dto';
import { ConflictDomainException } from '@/user/domain/exceptions/domain.exception';

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

    const newUser = new NewUser(dto.name, dto.email);
    return this.userRepository.create(newUser);
  }
}
