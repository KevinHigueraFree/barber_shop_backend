import { Module as ModuleEntity } from '@/module/domain/entities/module.entity';
import { NewModule } from '@/module/domain/entities/new-module';
import { UpdateModule } from '@/module/domain/entities/update-module';

export interface ModuleRepository {
  create(module: NewModule): Promise<ModuleEntity>;
  findById(id: number): Promise<ModuleEntity | null>;
  findByName(name: string): Promise<ModuleEntity | null>;
  findAll(): Promise<ModuleEntity[]>;
  update(module: UpdateModule): Promise<ModuleEntity>;
  deleteById(id: number): Promise<ModuleEntity | null>;
}

export const MODULE_REPOSITORY = 'MODULE_REPOSITORY';
