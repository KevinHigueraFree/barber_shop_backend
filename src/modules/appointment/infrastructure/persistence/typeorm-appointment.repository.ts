import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Appointment } from '@/modules/appointment/domain/entities/appointment.entity';
import { NewAppointment } from '@/modules/appointment/domain/entities/new-appointment';
import { AppointmentRepository } from '@/modules/appointment/domain/repositories/appointment.repository';
import { TypeOrmAppointmentEntity } from '@/modules/appointment/infrastructure/persistence/typeorm-appointment.entity';

@Injectable()
export class TypeOrmAppointmentRepository implements AppointmentRepository {
  constructor(
    @InjectRepository(TypeOrmAppointmentEntity)
    private readonly repo: Repository<TypeOrmAppointmentEntity>,
  ) {}

  async create(appointment: NewAppointment): Promise<Appointment> {
    const entity = this.repo.create(appointment);
    return this.toDomain(await this.repo.save(entity));
  }

  async findById(id: number): Promise<Appointment | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Appointment[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async updateStatus(id: number, statusId: number): Promise<Appointment> {
    const entity = await this.repo.preload({ id, statusId });
    if (!entity) {
      throw new Error('Appointment not found');
    }
    return this.toDomain(await this.repo.save(entity));
  }

  async deleteById(id: number): Promise<Appointment | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    if (!entity) return null;
    return this.toDomain(await this.repo.softRemove(entity));
  }

  private toDomain(entity: TypeOrmAppointmentEntity): Appointment {
    return new Appointment(
      entity.id,
      entity.date,
      entity.staffId,
      entity.customerId,
      entity.statusId,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
