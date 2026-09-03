import { Module as ModuleEntity } from '@/module/domain/entities/module.entity';

export interface ModuleRepository {
  findByName(name: string): Promise<ModuleEntity | null>;
  findAll(): Promise<ModuleEntity[]>;
}

export const MODULE_REPOSITORY = 'MODULE_REPOSITORY';
