import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Action as ActionEntity } from '@/action/domain/entities/action.entity';
import { NewAction } from '@/action/domain/entities/new-action';
import { UpdateAction } from '@/action/domain/entities/update-action';
import { ActionRepository } from '@/action/domain/repositories/action.repository';
import { TypeOrmActionEntity } from '@/action/infrastructure/persistence/typeorm-action.entity';

@Injectable()
export class TypeOrmActionRepository implements ActionRepository {
  constructor(
    @InjectRepository(TypeOrmActionEntity)
    private readonly repo: Repository<TypeOrmActionEntity>,
  ) {}

  async create(newAction: NewAction): Promise<ActionEntity> {
    const entity = this.repo.create(newAction);
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<ActionEntity | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<ActionEntity | null> {
    const entity = await this.repo.findOneBy({ name, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<ActionEntity[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async update(updateAction: UpdateAction): Promise<ActionEntity> {
    const entity = await this.repo.preload({
      id: updateAction.id,
      name: updateAction.name,
    });

    if (!entity) {
      throw new Error('Action not found');
    }

    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async deleteById(id: number): Promise<ActionEntity | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    if (!entity) {
      return null;
    }

    const deleted = await this.repo.softRemove(entity);
    return this.toDomain(deleted);
  }

  private toDomain(entity: TypeOrmActionEntity): ActionEntity {
    return new ActionEntity(
      entity.id,
      entity.name,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt ?? null,
    );
  }
}
