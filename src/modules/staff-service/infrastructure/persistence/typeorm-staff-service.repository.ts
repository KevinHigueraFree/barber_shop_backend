import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { NewStaffService } from '@/modules/staff-service/domain/entities/new-staff-service';
import { StaffService } from '@/modules/staff-service/domain/entities/staff-service.entity';
import { StaffServiceRepository } from '@/modules/staff-service/domain/repositories/staff-service.repository';
import { TypeOrmStaffServiceEntity } from '@/modules/staff-service/infrastructure/persistence/typeorm-staff-service.entity';

@Injectable()
export class TypeOrmStaffServiceRepository implements StaffServiceRepository {
  constructor(
    @InjectRepository(TypeOrmStaffServiceEntity)
    private readonly repo: Repository<TypeOrmStaffServiceEntity>,
  ) {}

  async create(staffService: NewStaffService): Promise<StaffService> {
    const entity = this.repo.create({
      staffId: staffService.staffId,
      serviceId: staffService.serviceId,
    });
    return this.toDomain(await this.repo.save(entity));
  }

  async findById(id: number): Promise<StaffService | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<StaffService[]> {
    const entities = await this.repo.find({ where: { deletedAt: IsNull() } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async deleteById(id: number): Promise<StaffService | null> {
    const entity = await this.repo.findOneBy({ id, deletedAt: IsNull() });
    if (!entity) {
      return null;
    }
    return this.toDomain(await this.repo.softRemove(entity));
  }

  private toDomain(entity: TypeOrmStaffServiceEntity): StaffService {
    return new StaffService(
      entity.id,
      entity.staffId,
      entity.serviceId,
      entity.createdAt,
      entity.deletedAt ?? null,
    );
  }
}
