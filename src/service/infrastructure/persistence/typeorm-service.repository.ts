import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmServiceEntity } from '@/service/infrastructure/persistence/typeorm-service.entity';
import { Repository } from 'typeorm';
import { NewService } from '@/service/domain/entities/new-service';
import { Service } from '@/service/domain/entities/service.entity';
import { UpdateService } from '@/service/domain/entities/update-service';
import { ServiceRepository } from '@/service/domain/repositories/service.repository';

@Injectable()
export class TypeOrmServiceRepository implements ServiceRepository {
  constructor(
    @InjectRepository(TypeOrmServiceEntity)
    private readonly repo: Repository<TypeOrmServiceEntity>,
  ) {}

  async create(newService: NewService): Promise<Service> {
    const entity = this.repo.create(newService); // without id: DB generates it
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<Service | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? this.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<Service | null> {
    const entity = await this.repo.findOneBy({ name });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Service[]> {
    const entities = await this.repo.find();
    return entities.map((e) => this.toDomain(e));
  }

  async update(updateService: UpdateService): Promise<Service> {
    const entity = await this.repo.preload({
      id: updateService.id,
      name: updateService.name,
      description: updateService.description,
      price: updateService.price,
      duration: updateService.duration,
    });
    if (!entity) {
      throw new Error('Service not found');
    }
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }
  async deleteById(id: number): Promise<Service | null> {
    const entity = await this.repo.findOneBy({ id });

    if (!entity) {
      return null;
    }

    const deleted = await this.repo.remove(entity);
    return this.toDomain(deleted);
  }

  private toDomain(entity: TypeOrmServiceEntity): Service {
    return new Service(
      entity.id,
      entity.name,
      entity.description,
      entity.price,
      entity.duration,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
