import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';
import { CreateModuleDto } from '@/module/application/dtos/create-module.dto';
import { UpdateModuleDto } from '@/module/application/dtos/update-module.dto';
import { CreateModuleUseCase } from '@/module/application/use-cases/create-module.use-case';
import { DeleteModuleUseCase } from '@/module/application/use-cases/delete-module.use-case';
import { GetModuleUseCase } from '@/module/application/use-cases/get-module.use-case';
import { ListModulesUseCase } from '@/module/application/use-cases/list-modules.use-case';
import { UpdateModuleUseCase } from '@/module/application/use-cases/update-module.use-case';

@Controller('modules')
export class ModuleController {
  constructor(
    private readonly createModuleUseCase: CreateModuleUseCase,
    private readonly getModuleUseCase: GetModuleUseCase,
    private readonly listModulesUseCase: ListModulesUseCase,
    private readonly updateModuleUseCase: UpdateModuleUseCase,
    private readonly deleteModuleUseCase: DeleteModuleUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateModuleDto) {
    return this.createModuleUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listModulesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getModuleUseCase.execute(id);
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateModuleDto) {
    return this.updateModuleUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteModuleUseCase.execute(id);
  }
}
