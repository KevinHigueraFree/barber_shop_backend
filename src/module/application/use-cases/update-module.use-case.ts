import { Inject, Injectable } from '@nestjs/common';
import { UpdateModuleDto } from '@/module/application/dtos/update-module.dto';
import { UpdateModule } from '@/module/domain/entities/update-module';
import { Module } from '@/module/domain/entities/module.entity';
import {
  MODULE_REPOSITORY,
  type ModuleRepository,
} from '@/module/domain/repositories/module.repository';
import {
  ConflictDomainException,
  EntityNotFoundException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class UpdateModuleUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: ModuleRepository,
  ) {}

  async execute(id: number, dto: UpdateModuleDto): Promise<Module> {
    const existing = await this.moduleRepository.findById(id);
    if (!existing) {
      throw new EntityNotFoundException('module', id);
    }

    if (dto.name && dto.name !== existing.name) {
      const nameTaken = await this.moduleRepository.findByName(dto.name);
      if (nameTaken && nameTaken.id !== id) {
        throw new ConflictDomainException('The name is already registered');
      }
    }

    const updateModule = new UpdateModule(id, dto.name ?? existing.name);
    return this.moduleRepository.update(updateModule);
  }
}
