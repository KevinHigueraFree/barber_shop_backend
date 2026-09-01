import { Inject, Injectable } from '@nestjs/common';
import { Module } from '@/module/domain/entities/module.entity';
import {
  MODULE_REPOSITORY,
  type ModuleRepository,
} from '@/module/domain/repositories/module.repository';

@Injectable()
export class ListModulesUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: ModuleRepository,
  ) {}

  async execute(): Promise<Module[]> {
    return this.moduleRepository.findAll();
  }
}
