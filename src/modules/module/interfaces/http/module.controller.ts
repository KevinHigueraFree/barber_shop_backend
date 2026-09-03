import { Controller, Get } from '@nestjs/common';
import { ListModulesUseCase } from '@/modules/module/application/use-cases/list-modules.use-case';

@Controller('modules')
export class ModuleController {
  constructor(private readonly listModulesUseCase: ListModulesUseCase) {}

  @Get()
  findAll() {
    return this.listModulesUseCase.execute();
  }
}
