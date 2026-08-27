import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateTimeOffUseCase } from '@/time-off/application/use-cases/create-time-off.use-case';
import { GetTimeOffUseCase } from '@/time-off/application/use-cases/get-time-off.use-case';
import { ListTimeOffsUseCase } from '@/time-off/application/use-cases/list-time-offs.use-case';
import { UpdateTimeOffUseCase } from '@/time-off/application/use-cases/update-time-off.use-case';
import { DeleteTimeOffUseCase } from '@/time-off/application/use-cases/delete-time-off.use-case';
import { CreateTimeOffDto } from '@/time-off/application/dtos/create-time-off.dto';
import { UpdateTimeOffDto } from '@/time-off/application/dtos/update-time-off.dto'; // Asegúrate de tener este DTO creado
import { ParseIdPipe } from '@/user/interfaces/http/pipes/parse-id.pipe'; // O tu pipe genérico de IDs

@Controller('time-offs')
export class TimeOffController {
  constructor(
    private readonly createTimeOffUseCase: CreateTimeOffUseCase,
    private readonly getTimeOffUseCase: GetTimeOffUseCase,
    private readonly listTimeOffsUseCase: ListTimeOffsUseCase,
    private readonly updateTimeOffUseCase: UpdateTimeOffUseCase,
    private readonly deleteTimeOffUseCase: DeleteTimeOffUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTimeOffDto) {
    return this.createTimeOffUseCase.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getTimeOffUseCase.execute(id);
  }

  @Get()
  findAll() {
    return this.listTimeOffsUseCase.execute();
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateTimeOffDto) {
    return this.updateTimeOffUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteTimeOffUseCase.execute(id);
  }
}
