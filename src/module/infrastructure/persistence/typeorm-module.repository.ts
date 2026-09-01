import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { NewModule } from '@/module/domain/entities/new-module';
import { UpdateModule } from '@/module/domain/entities/update-module';
import { Module as ModuleEntity } from '@/module/domain/entities/module.entity';
import { ModuleRepository } from '@/module/domain/repositories/module.repository';
import { TypeOrmModuleEntity } from '@/module/infrastructure/persistence/typeorm-module.entity';

@Injectable()
export class TypeOrmModuleRepository implements ModuleRepository {
  constructor(
    @InjectRepository(TypeOrmModuleEntity)
    private readonly repo: Repository<TypeOrmModuleEntity>,
  ) {}

  async create(newModule: NewModule): Promise<ModuleEntity> {
    const entity = this.repo.create(newModule);
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<ModuleEntity | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<ModuleEntity | null> {
    const entity = await this.repo.findOneBy({ name, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<ModuleEntity[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async update(updateModule: UpdateModule): Promise<ModuleEntity> {
    const entity = await this.repo.preload({
      id: updateModule.id,
      name: updateModule.name,
    });

    if (!entity) {
      throw new Error('Module not found');
    }

    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async deleteById(id: number): Promise<ModuleEntity | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    if (!entity) {
      return null;
    }

    const deleted = await this.repo.softRemove(entity);
    return this.toDomain(deleted);
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
