import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import { NewRole } from '@/role/domain/entities/new-role';
import { Role } from '@/role/domain/entities/role.entity';
import { UpdateRole } from '@/role/domain/entities/update-role';
import { RoleRepository } from '@/role/domain/repositories/role.repository';
import { TypeOrmRoleEntity } from '@/role/infrastructure/persistence/typeorm-role.entity';
import { TypeOrmRolePermissionEntity } from '@/role-permission/infrastructure/persistence/typeorm-role-permission.entity';

@Injectable()
export class TypeOrmRoleRepository implements RoleRepository {
  constructor(
    @InjectRepository(TypeOrmRoleEntity)
    private readonly repo: Repository<TypeOrmRoleEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(newRole: NewRole): Promise<Role> {
    const entity = this.repo.create(newRole);
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<Role | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const entity = await this.repo.findOneBy({ name, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Role[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async update(updateRole: UpdateRole): Promise<Role> {
    const entity = await this.repo.preload({
      id: updateRole.id,
      name: updateRole.name,
      description: updateRole.description,
    });

    if (!entity) {
      throw new Error('Role not found');
    }

    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async deleteById(id: number): Promise<Role | null> {
    return this.dataSource.transaction(async (manager) => {
      const roleRepo = manager.getRepository(TypeOrmRoleEntity);
      const rolePermissionRepo = manager.getRepository(TypeOrmRolePermissionEntity);
      const entity = await roleRepo.findOneBy({ id, deletedAt: IsNull() });

      if (!entity) {
        return null;
      }

      await rolePermissionRepo.softDelete({ roleId: id });
      const deleted = await roleRepo.softRemove(entity);
      return this.toDomain(deleted);
    });
  }

  private toDomain(entity: TypeOrmRoleEntity): Role {
    return new Role(
      entity.id,
      entity.name,
      entity.description,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt ?? null,
    );
  }
}
