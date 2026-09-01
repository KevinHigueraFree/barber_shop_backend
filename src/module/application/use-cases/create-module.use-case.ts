import { Inject, Injectable } from '@nestjs/common';
import { CreateModuleDto } from '@/module/application/dtos/create-module.dto';
import { NewModule } from '@/module/domain/entities/new-module';
import { Module } from '@/module/domain/entities/module.entity';
import {
  MODULE_REPOSITORY,
  type ModuleRepository,
} from '@/module/domain/repositories/module.repository';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateModuleUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: ModuleRepository,
  ) {}

  async execute(dto: CreateModuleDto): Promise<Module> {
    const existing = await this.moduleRepository.findByName(dto.name);
    if (existing) {
      throw new ConflictDomainException('The name is already registered');
    }

    const newModule = new NewModule(dto.name);
    return this.moduleRepository.create(newModule);
  }
}
