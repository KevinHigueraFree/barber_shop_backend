import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { NewAppointmentStatus } from '@/appointment-status/domain/entities/new-appointment-status';
import { AppointmentStatus } from '@/appointment-status/domain/entities/appointment-status.entity';
import { UpdateAppointmentStatus } from '@/appointment-status/domain/entities/update-appointment-status';
import { AppointmentStatusRepository } from '@/appointment-status/domain/repositories/appointment-status.repository';
import { TypeOrmAppointmentStatusEntity } from '@/appointment-status/infrastructure/persistence/typeorm-appointment-status.entity';

@Injectable()
export class TypeOrmAppointmentStatusRepository implements AppointmentStatusRepository {
  constructor(
    @InjectRepository(TypeOrmAppointmentStatusEntity)
    private readonly repo: Repository<TypeOrmAppointmentStatusEntity>,
  ) {}

  async create(newStatus: NewAppointmentStatus): Promise<AppointmentStatus> {
    const entity = this.repo.create({
      name: newStatus.name,
      description: newStatus.description,
      colorCode: newStatus.colorCode,
      isEnabled: newStatus.isEnabled,
    });
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<AppointmentStatus | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<AppointmentStatus | null> {
    const entity = await this.repo.findOneBy({ name, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<AppointmentStatus[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((e) => this.toDomain(e));
  }

  async update(updateStatus: UpdateAppointmentStatus): Promise<AppointmentStatus> {
    const partial: Partial<TypeOrmAppointmentStatusEntity> = {
      id: updateStatus.id,
      name: updateStatus.name,
      description: updateStatus.description,
    };
    if (updateStatus.colorCode !== undefined) {
      partial.colorCode = updateStatus.colorCode;
    }
    if (updateStatus.isEnabled !== undefined) {
      partial.isEnabled = updateStatus.isEnabled;
    }

    const entity = await this.repo.preload(partial);
    if (!entity) {
      throw new Error('Appointment status not found');
    }
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async deleteById(id: number): Promise<AppointmentStatus | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    if (!entity) {
      return null;
    }
    const deleted = await this.repo.softRemove(entity);
    return this.toDomain(deleted);
  }

  private toDomain(entity: TypeOrmAppointmentStatusEntity): AppointmentStatus {
    return new AppointmentStatus(
      entity.id,
      entity.name,
      entity.description ?? null,
      entity.colorCode,
      entity.isEnabled,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt ?? null,
    );
  }
}
