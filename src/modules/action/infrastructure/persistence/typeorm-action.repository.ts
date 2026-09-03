import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Action as ActionEntity } from '@/modules/action/domain/entities/action.entity';
import { ActionRepository } from '@/modules/action/domain/repositories/action.repository';
import { TypeOrmActionEntity } from '@/modules/action/infrastructure/persistence/typeorm-action.entity';

@Injectable()
export class TypeOrmActionRepository implements ActionRepository {
  constructor(
    @InjectRepository(TypeOrmActionEntity)
    private readonly repo: Repository<TypeOrmActionEntity>,
  ) {}

  async findByName(name: string): Promise<ActionEntity | null> {
    const entity = await this.repo.findOneBy({ name, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<ActionEntity[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
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
