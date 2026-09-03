import { NewService } from '@/modules/service/domain/entities/new-service';
import { Service } from '@/modules/service/domain/entities/service.entity';
import { UpdateService } from '@/modules/service/domain/entities/update-service';

export interface ServiceRepository {
  create(service: NewService): Promise<Service>;
  findById(id: number): Promise<Service | null>;
  findByName(name: string): Promise<Service | null>;
  findAll(): Promise<Service[]>;
  update(service: UpdateService): Promise<Service>;
  deleteById(id: number): Promise<Service | null>;
  existsAny(): Promise<boolean>;
}

// Dependency injection token (Nest cannot inject interfaces directly)
export const SERVICE_REPOSITORY = 'SERVICE_REPOSITORY';
