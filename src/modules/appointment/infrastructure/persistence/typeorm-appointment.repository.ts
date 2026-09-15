import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Appointment } from '@/modules/appointment/domain/entities/appointment.entity';
import { NewAppointment } from '@/modules/appointment/domain/entities/new-appointment';
import { AppointmentRepository } from '@/modules/appointment/domain/repositories/appointment.repository';
import { TypeOrmAppointmentEntity } from '@/modules/appointment/infrastructure/persistence/typeorm-appointment.entity';
import { AppointmentWithServices } from '@/modules/appointment/domain/read-models/appointment-with-services.read-model';

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

  async findByIdWithServices(id: number): Promise<AppointmentWithServices | null> {
    const appointment = await this.repo
      .createQueryBuilder('appointment')
      .innerJoinAndSelect('appointment.appointmentServices', 'as')
      .innerJoinAndSelect('as.service', 's')
      .select([
        'appointment.id',
        'appointment.date',
        'appointment.createdAt',
        'appointment.updatedAt',
        'as.id',
        'as.priceAtService',
        'as.quantity',
        'as.total',
        's.id',
        's.name',
      ])
      .where('appointment.id = :id', { id })
      .andWhere('appointment.deleted_at IS NULL')
      .andWhere('as.deleted_at IS NULL')
      .andWhere('s.deleted_at IS NULL')
      .getOne();

    if (!appointment) return null;

    return {
      id: appointment.id,
      date: appointment.date,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      appointmentServices: appointment.appointmentServices.map((as) => ({
        id: as.id,
        service: {
          id: as.service.id,
          name: as.service.name,
          price: as.priceAtService,
          quantity: as.quantity,
          total: as.total,
        },
      })),
    };
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
