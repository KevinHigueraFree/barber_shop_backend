import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewSchedulingSettings } from '@/scheduling-settings/domain/entities/new-scheduling-settings';
import { SchedulingSettings } from '@/scheduling-settings/domain/entities/scheduling-settings.entity';
import { UpdateSchedulingSettings } from '@/scheduling-settings/domain/entities/update-scheduling-settings';
import { SchedulingSettingsRepository } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import { TypeOrmSchedulingSettingsEntity } from '@/scheduling-settings/infrastructure/persistence/typeorm-scheduling-settings.entity';

@Injectable()
export class TypeOrmSchedulingSettingsRepository implements SchedulingSettingsRepository {
  constructor(
    @InjectRepository(TypeOrmSchedulingSettingsEntity)
    private readonly repo: Repository<TypeOrmSchedulingSettingsEntity>,
  ) {}

  async create(settings: NewSchedulingSettings): Promise<SchedulingSettings> {
    const entity = this.repo.create({
      slotDurationMinutes: settings.slotDurationMinutes,
    });
    return this.toDomain(await this.repo.save(entity));
  }

  /**
   * Returns the single global settings record (if any), regardless of its id.
   */
  async findFirst(): Promise<SchedulingSettings | null> {
    const entities = await this.repo.find({
      order: { id: 'ASC' },
      take: 1,
    });
    return entities.length ? this.toDomain(entities[0]) : null;
  }

  async findAll(): Promise<SchedulingSettings[]> {
    const entities = await this.repo.find({
      order: { id: 'ASC' },
    });
    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: number): Promise<SchedulingSettings | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? this.toDomain(entity) : null;
  }

  async update(settings: UpdateSchedulingSettings): Promise<SchedulingSettings> {
    const entity = await this.repo.preload({
      id: settings.id,
      slotDurationMinutes: settings.slotDurationMinutes,
    });
    if (!entity) {
      throw new Error('Scheduling settings not found');
    }
    return this.toDomain(await this.repo.save(entity));
  }

  private toDomain(entity: TypeOrmSchedulingSettingsEntity): SchedulingSettings {
    return new SchedulingSettings(
      entity.id,
      entity.slotDurationMinutes,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
