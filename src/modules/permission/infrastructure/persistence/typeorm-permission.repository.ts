import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Permission } from '@/modules/permission/domain/entities/permission.entity';
import { PermissionRepository } from '@/modules/permission/domain/repositories/permission.repository';
import { TypeOrmPermissionEntity } from '@/modules/permission/infrastructure/persistence/typeorm-permission.entity';

@Injectable()
export class TypeOrmPermissionRepository implements PermissionRepository {
  constructor(
    @InjectRepository(TypeOrmPermissionEntity)
    private readonly repo: Repository<TypeOrmPermissionEntity>,
  ) {}

  async findById(id: number): Promise<Permission | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findByModuleAndAction(moduleId: number, actionId: number): Promise<Permission | null> {
    const entity = await this.repo.findOneBy({
      moduleId,
      actionId,
      deletedAt: IsNull(),
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Permission[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  private toDomain(entity: TypeOrmPermissionEntity): Permission {
    return new Permission(
      entity.id,
      entity.moduleId,
      entity.actionId,
      entity.createdAt,
      entity.deletedAt ?? null,
    );
  }
}
