import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { AppointmentStatus } from '@/modules/appointment-status/domain/entities/appointment-status.entity';
import { AppointmentStatusRepository } from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import { TypeOrmAppointmentStatusEntity } from '@/modules/appointment-status/infrastructure/persistence/typeorm-appointment-status.entity';

@Injectable()
export class TypeOrmAppointmentStatusRepository implements AppointmentStatusRepository {
  constructor(
    @InjectRepository(TypeOrmAppointmentStatusEntity)
    private readonly repo: Repository<TypeOrmAppointmentStatusEntity>,
  ) {}

  async findById(id: number): Promise<AppointmentStatus | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<AppointmentStatus[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((e) => this.toDomain(e));
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
