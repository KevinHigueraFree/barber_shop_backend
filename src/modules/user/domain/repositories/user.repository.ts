import { User } from '@/modules/user/domain/entities/user.entity';
import type { NewUser } from '@/modules/user/domain/entities/new-user';
import type { UpdateUser } from '@/modules/user/domain/entities/update-user';

export interface UserRepository {
  create(user: NewUser): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: UpdateUser): Promise<User>;
  deleteById(id: number): Promise<User | null>;
}

// Dependency injection token (Nest cannot inject interfaces directly)
export const USER_REPOSITORY = 'USER_REPOSITORY';
