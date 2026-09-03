import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Module as ModuleEntity } from '@/module/domain/entities/module.entity';
import { ModuleRepository } from '@/module/domain/repositories/module.repository';
import { TypeOrmModuleEntity } from '@/module/infrastructure/persistence/typeorm-module.entity';

@Injectable()
export class TypeOrmModuleRepository implements ModuleRepository {
  constructor(
    @InjectRepository(TypeOrmModuleEntity)
    private readonly repo: Repository<TypeOrmModuleEntity>,
  ) {}

  async findByName(name: string): Promise<ModuleEntity | null> {
    const entity = await this.repo.findOneBy({ name, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<ModuleEntity[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  private toDomain(entity: TypeOrmModuleEntity): ModuleEntity {
    return new ModuleEntity(
      entity.id,
      entity.name,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt ?? null,
    );
  }
}
