import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { NewTimeSlot } from '@/time-slot/domain/entities/new-time-slot';
import { TimeSlot } from '@/time-slot/domain/entities/time-slot.entity';
import { UpdateTimeSlot } from '@/time-slot/domain/entities/update-time-slot';
import { TimeSlotRepository } from '@/time-slot/domain/repositories/time-slot.repository';
import { TypeOrmTimeSlotEntity } from '@/time-slot/infrastructure/persistence/typeorm-time-slot.entity';

@Injectable()
export class TypeOrmTimeSlotRepository implements TimeSlotRepository {
  constructor(
    @InjectRepository(TypeOrmTimeSlotEntity)
    private readonly repo: Repository<TypeOrmTimeSlotEntity>,
  ) {}

  async create(newTimeSlot: NewTimeSlot): Promise<TimeSlot> {
    const entity = this.repo.create({
      startTime: newTimeSlot.startTime,
      endTime: newTimeSlot.endTime,
    });
    return this.toDomain(await this.repo.save(entity));
  }

  async findById(id: number): Promise<TimeSlot | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findByRange(startTime: string, endTime: string): Promise<TimeSlot | null> {
    const entity = await this.repo.findOneBy({ startTime, endTime, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<TimeSlot[]> {
    const entities = await this.repo.find({
      where: { deletedAt: IsNull() },
      order: { startTime: 'ASC' },
    });
    return entities.map((entity) => this.toDomain(entity));
  }

  async update(updateTimeSlot: UpdateTimeSlot): Promise<TimeSlot> {
    const entity = await this.repo.preload({
      id: updateTimeSlot.id,
      startTime: updateTimeSlot.startTime,
      endTime: updateTimeSlot.endTime,
    });
    if (!entity) {
      throw new Error('Time slot not found');
    }
    return this.toDomain(await this.repo.save(entity));
  }

  async deleteById(id: number): Promise<TimeSlot | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    if (!entity) {
      return null;
    }
    const deleted = await this.repo.softRemove(entity);
    return this.toDomain(deleted);
  }

  async existsAny(): Promise<boolean> {
    const entity = await this.repo.findOne({
      where: { deletedAt: IsNull() },
      select: ['id'], // selecciona solo la columna mínima
    });
    return entity !== null;
  }

  private toDomain(entity: TypeOrmTimeSlotEntity): TimeSlot {
    return new TimeSlot(
      entity.id,
      entity.startTime,
      entity.endTime,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt ?? null,
    );
  }
}
