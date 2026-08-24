import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { NewTimeOff } from '@/time-off/domain/entities/new-time-off';
import { TimeOff } from '@/time-off/domain/entities/time-off.entity';
import { TimeOffRepository } from '@/time-off/domain/repositories/time-off.repository';
import { TypeOrmTimeOffEntity } from '@/time-off/infrastructure/persistence/typeorm-time-off.entity';
import { UpdateTimeOff } from '@/time-off/domain/entities/update-time-off';

@Injectable()
export class TypeOrmTimeOffRepository implements TimeOffRepository {
  constructor(
    @InjectRepository(TypeOrmTimeOffEntity)
    private readonly repo: Repository<TypeOrmTimeOffEntity>,
  ) {}

  async create(newTimeOff: NewTimeOff): Promise<TimeOff> {
    const entity = this.repo.create({
      staffId: newTimeOff.staffId,
      reason: newTimeOff.reason,
      startDatetime: newTimeOff.startDatetime,
      endDatetime: newTimeOff.endDatetime,
    });
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<TimeOff | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<TimeOff[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async update(updateTimeOff: UpdateTimeOff): Promise<TimeOff> {
    const entity = await this.repo.preload({
      id: updateTimeOff.id,
      staffId: updateTimeOff.staffId,
      reason: updateTimeOff.reason,
      startDatetime: updateTimeOff.startDatetime,
      endDatetime: updateTimeOff.endDatetime,
    });
    if (!entity) {
      throw new Error('Time Off not found');
    }
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async deleteById(id: number): Promise<TimeOff | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });

    if (!entity) {
      return null;
    }

    const deleted = await this.repo.softRemove(entity);
    return this.toDomain(deleted);
  }

  private toDomain(entity: TypeOrmTimeOffEntity): TimeOff {
    return new TimeOff(
      entity.id,
      entity.staffId,
      entity.reason,
      entity.startDatetime,
      entity.endDatetime,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
