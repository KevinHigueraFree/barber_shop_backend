import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { AppointmentTimeSlot } from '@/modules/appointment-time-slot/domain/entities/appointment-time-slot.entity';
import { NewAppointmentTimeSlot } from '@/modules/appointment-time-slot/domain/entities/new-appointment-time-slot';
import { AppointmentTimeSlotRepository } from '@/modules/appointment-time-slot/domain/repositories/appointment-time-slot.repository';
import { TypeOrmAppointmentTimeSlotEntity } from '@/modules/appointment-time-slot/infrastructure/persistence/typeorm-appointment-time-slot.entity';

@Injectable()
export class TypeOrmAppointmentTimeSlotRepository implements AppointmentTimeSlotRepository {
  constructor(
    @InjectRepository(TypeOrmAppointmentTimeSlotEntity)
    private readonly repo: Repository<TypeOrmAppointmentTimeSlotEntity>,
  ) {}

  async create(appointmentTimeSlot: NewAppointmentTimeSlot): Promise<AppointmentTimeSlot> {
    const entity = this.repo.create(appointmentTimeSlot);
    return this.toDomain(await this.repo.save(entity));
  }

  async findById(id: number): Promise<AppointmentTimeSlot | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findByAppointmentAndTimeSlot(
    appointmentId: number,
    timeSlotId: number,
  ): Promise<AppointmentTimeSlot | null> {
    const entity = await this.repo.findOneBy({
      appointmentId,
      timeSlotId,
      deletedAt: IsNull(),
    });
    return entity ? this.toDomain(entity) : null;
  }

  async deleteById(id: number): Promise<AppointmentTimeSlot | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    if (!entity) return null;
    return this.toDomain(await this.repo.softRemove(entity));
  }

  private toDomain(entity: TypeOrmAppointmentTimeSlotEntity): AppointmentTimeSlot {
    return new AppointmentTimeSlot(
      entity.id,
      entity.appointmentId,
      entity.timeSlotId,
      entity.createdAt,
      entity.deletedAt,
    );
  }
}
