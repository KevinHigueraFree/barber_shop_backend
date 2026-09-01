import { Inject, Injectable } from '@nestjs/common';
import { Module } from '@/module/domain/entities/module.entity';
import {
  MODULE_REPOSITORY,
  type ModuleRepository,
} from '@/module/domain/repositories/module.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetModuleUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: ModuleRepository,
  ) {}

  async execute(id: number): Promise<Module> {
    const module = await this.moduleRepository.findById(id);
    if (!module) {
      throw new EntityNotFoundException('module', id);
    }

    return module;
  }
}
