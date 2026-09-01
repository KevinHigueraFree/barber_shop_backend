import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from '@/user/domain/entities/user.entity';
import { NewUser } from '@/user/domain/entities/new-user';
import { UpdateUser } from '@/user/domain/entities/update-user';
import { UserRepository } from '@/user/domain/repositories/user.repository';
import { TypeOrmUserEntity } from '@/user/infrastructure/persistence/typeorm-user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repo: Repository<TypeOrmUserEntity>,
  ) {}

  async create(newUser: NewUser): Promise<User> {
    const entity = this.repo.create({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      roleId: newUser.roleId,
      isEnabled: newUser.isEnabled,
      isCustomer: newUser.isCustomer,
      isStaff: newUser.isStaff,
    });
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<User | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOneBy({ email, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async update(updateUser: UpdateUser): Promise<User> {
    const entity = await this.repo.preload({
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      password: updateUser.password,
      roleId: updateUser.roleId,
      isEnabled: updateUser.isEnabled,
      isCustomer: updateUser.isCustomer,
      isStaff: updateUser.isStaff,
    });
    if (!entity) {
      throw new Error('User not found');
    }
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async deleteById(id: number): Promise<User | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });

    if (!entity) {
      return null;
    }

    const deleted = await this.repo.softRemove(entity);
    return this.toDomain(deleted);
  }

  private toDomain(entity: TypeOrmUserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.email,
      entity.password,
      entity.roleId,
      entity.isEnabled,
      entity.isCustomer,
      entity.isStaff,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
