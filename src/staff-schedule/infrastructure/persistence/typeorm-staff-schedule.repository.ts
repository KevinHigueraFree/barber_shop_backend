import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { NewStaffSchedule } from '@/staff-schedule/domain/entities/new-staff-schedule';
import { StaffSchedule } from '@/staff-schedule/domain/entities/staff-schedule.entity';
import { UpdateStaffSchedule } from '@/staff-schedule/domain/entities/update-staff-schedule';
import { StaffScheduleRepository } from '@/staff-schedule/domain/repositories/staff-schedule.repository';
import { TypeOrmStaffScheduleEntity } from '@/staff-schedule/infrastructure/persistence/typeorm-staff-schedule.entity';

@Injectable()
export class TypeOrmStaffScheduleRepository implements StaffScheduleRepository {
  constructor(
    @InjectRepository(TypeOrmStaffScheduleEntity)
    private readonly repo: Repository<TypeOrmStaffScheduleEntity>,
  ) {}

  async create(schedule: NewStaffSchedule): Promise<StaffSchedule> {
    const entity = this.repo.create({
      staffId: schedule.staffId,
      dayOfWeek: schedule.dayOfWeek,
      workStartTime: schedule.workStartTime,
      workEndTime: schedule.workEndTime,
      breakStartTime: schedule.breakStartTime,
      breakEndTime: schedule.breakEndTime,
    });
    return this.toDomain(await this.repo.save(entity));
  }

  async findById(id: number): Promise<StaffSchedule | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<StaffSchedule[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async update(schedule: UpdateStaffSchedule): Promise<StaffSchedule> {
    const entity = await this.repo.preload({
      id: schedule.id,
      staffId: schedule.staffId,
      dayOfWeek: schedule.dayOfWeek,
      workStartTime: schedule.workStartTime,
      workEndTime: schedule.workEndTime,
      breakStartTime: schedule.breakStartTime,
      breakEndTime: schedule.breakEndTime,
    });
    if (!entity) {
      throw new Error('Staff schedule not found');
    }
    return this.toDomain(await this.repo.save(entity));
  }

  async deleteById(id: number): Promise<StaffSchedule | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    if (!entity) {
      return null;
    }
    return this.toDomain(await this.repo.softRemove(entity));
  }

  private toDomain(entity: TypeOrmStaffScheduleEntity): StaffSchedule {
    return new StaffSchedule(
      entity.id,
      entity.staffId,
      entity.dayOfWeek,
      entity.workStartTime,
      entity.workEndTime,
      entity.breakStartTime,
      entity.breakEndTime,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt ?? null,
    );
  }
}
