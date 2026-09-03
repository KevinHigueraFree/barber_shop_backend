import { Controller, Get } from '@nestjs/common';
import { ListActionsUseCase } from '@/action/application/use-cases/list-actions.use-case';

@Controller('actions')
export class ActionController {
  constructor(private readonly listActionsUseCase: ListActionsUseCase) {}

  @Get()
  findAll() {
    return this.listActionsUseCase.execute();
  }
}
