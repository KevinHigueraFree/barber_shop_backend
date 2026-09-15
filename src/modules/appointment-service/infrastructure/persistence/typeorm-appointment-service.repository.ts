import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { AppointmentService } from '@/modules/appointment-service/domain/entities/appointment-service.entity';
import { NewAppointmentService } from '@/modules/appointment-service/domain/entities/new-appointment-service';
import { AppointmentServiceRepository } from '@/modules/appointment-service/domain/repositories/appointment-service.repository';
import { TypeOrmAppointmentServiceEntity } from '@/modules/appointment-service/infrastructure/persistence/typeorm-appointment-service.entity';

@Injectable()
export class TypeOrmAppointmentServiceRepository implements AppointmentServiceRepository {
  constructor(
    @InjectRepository(TypeOrmAppointmentServiceEntity)
    private readonly repo: Repository<TypeOrmAppointmentServiceEntity>,
  ) {}

  async create(appointmentService: NewAppointmentService): Promise<AppointmentService> {
    const entity = this.repo.create({
      appointmentId: appointmentService.appointmentId,
      serviceId: appointmentService.serviceId,
      priceAtService: appointmentService.priceAtService,
      quantity: appointmentService.quantity,
      total: appointmentService.total,
    });
    return this.toDomain(await this.repo.save(entity));
  }

  async findById(id: number): Promise<AppointmentService | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<AppointmentService[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async findByAppointmentAndService(
    appointmentId: number,
    serviceId: number,
  ): Promise<AppointmentService | null> {
    const entity = await this.repo.findOneBy({ appointmentId, serviceId, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async deleteById(id: number): Promise<AppointmentService | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    if (!entity) return null;
    return this.toDomain(await this.repo.softRemove(entity));
  }

  private toDomain(entity: TypeOrmAppointmentServiceEntity): AppointmentService {
    return new AppointmentService(
      entity.id,
      entity.appointmentId,
      entity.serviceId,
      entity.priceAtService,
      entity.quantity,
      entity.total,
      entity.createdAt,
      entity.deletedAt ?? null,
    );
  }
}
