import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewSchedulingSetting } from '@/modules/scheduling-setting/domain/entities/new-scheduling-setting';
import { SchedulingSetting } from '@/modules/scheduling-setting/domain/entities/scheduling-setting.entity';
import { UpdateSchedulingSetting } from '@/modules/scheduling-setting/domain/entities/update-scheduling-setting';
import { SchedulingSettingRepository } from '@/modules/scheduling-setting/domain/repositories/scheduling-setting.repository';
import { TypeOrmSchedulingSettingEntity } from '@/modules/scheduling-setting/infrastructure/persistence/typeorm-scheduling-setting.entity';

@Injectable()
export class TypeOrmSchedulingSettingRepository implements SchedulingSettingRepository {
  constructor(
    @InjectRepository(TypeOrmSchedulingSettingEntity)
    private readonly repo: Repository<TypeOrmSchedulingSettingEntity>,
  ) {}

  async create(settings: NewSchedulingSetting): Promise<SchedulingSetting> {
    const entity = this.repo.create({
      slotDurationMinutes: settings.slotDurationMinutes,
    });
    return this.toDomain(await this.repo.save(entity));
  }

  /**
   * Returns the single global settings record (if any), regardless of its id.
   */
  async findFirst(): Promise<SchedulingSetting | null> {
    const entities = await this.repo.find({
      order: { id: 'ASC' },
      take: 1,
    });
    return entities.length ? this.toDomain(entities[0]) : null;
  }

  async findAll(): Promise<SchedulingSetting[]> {
    const entities = await this.repo.find({
      order: { id: 'ASC' },
    });
    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: number): Promise<SchedulingSetting | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? this.toDomain(entity) : null;
  }

  async update(settings: UpdateSchedulingSetting): Promise<SchedulingSetting> {
    const entity = await this.repo.preload({
      id: settings.id,
      slotDurationMinutes: settings.slotDurationMinutes,
    });
    if (!entity) {
      throw new Error('Scheduling settings not found');
    }
    return this.toDomain(await this.repo.save(entity));
  }

  private toDomain(entity: TypeOrmSchedulingSettingEntity): SchedulingSetting {
    return new SchedulingSetting(
      entity.id,
      entity.slotDurationMinutes,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
