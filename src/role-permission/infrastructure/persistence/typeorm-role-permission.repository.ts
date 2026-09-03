import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { NewRolePermission } from '@/role-permission/domain/entities/new-role-permission';
import { RolePermission } from '@/role-permission/domain/entities/role-permission.entity';
import { RolePermissionRepository } from '@/role-permission/domain/repositories/role-permission.repository';
import { TypeOrmRolePermissionEntity } from '@/role-permission/infrastructure/persistence/typeorm-role-permission.entity';

@Injectable()
export class TypeOrmRolePermissionRepository implements RolePermissionRepository {
  constructor(
    @InjectRepository(TypeOrmRolePermissionEntity)
    private readonly repo: Repository<TypeOrmRolePermissionEntity>,
  ) {}

  async create(newRolePermission: NewRolePermission): Promise<RolePermission> {
    const entity = this.repo.create(newRolePermission);
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<RolePermission | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findByRoleAndPermission(
    roleId: number,
    permissionId: number,
  ): Promise<RolePermission | null> {
    const entity = await this.repo.findOneBy({
      roleId,
      permissionId,
      deletedAt: IsNull(),
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<RolePermission[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async deleteById(id: number): Promise<RolePermission | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    if (!entity) {
      return null;
    }

    const deleted = await this.repo.softRemove(entity);
    return this.toDomain(deleted);
  }

  private toDomain(entity: TypeOrmRolePermissionEntity): RolePermission {
    return new RolePermission(
      entity.id,
      entity.roleId,
      entity.permissionId,
      entity.createdAt,
      entity.deletedAt ?? null,
    );
  }
}
