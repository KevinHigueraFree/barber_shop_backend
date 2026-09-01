import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';
import { CreateActionDto } from '@/action/application/dtos/create-action.dto';
import { UpdateActionDto } from '@/action/application/dtos/update-action.dto';
import { CreateActionUseCase } from '@/action/application/use-cases/create-action.use-case';
import { DeleteActionUseCase } from '@/action/application/use-cases/delete-action.use-case';
import { GetActionUseCase } from '@/action/application/use-cases/get-action.use-case';
import { ListActionsUseCase } from '@/action/application/use-cases/list-actions.use-case';
import { UpdateActionUseCase } from '@/action/application/use-cases/update-action.use-case';

@Controller('actions')
export class ActionController {
  constructor(
    private readonly createActionUseCase: CreateActionUseCase,
    private readonly getActionUseCase: GetActionUseCase,
    private readonly listActionsUseCase: ListActionsUseCase,
    private readonly updateActionUseCase: UpdateActionUseCase,
    private readonly deleteActionUseCase: DeleteActionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateActionDto) {
    return this.createActionUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listActionsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getActionUseCase.execute(id);
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateActionDto) {
    return this.updateActionUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteActionUseCase.execute(id);
  }
}
