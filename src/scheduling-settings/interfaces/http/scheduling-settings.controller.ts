import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSchedulingSettingsDto } from '@/scheduling-settings/application/dtos/create-scheduling-settings.dto';
import { UpdateSchedulingSettingsDto } from '@/scheduling-settings/application/dtos/update-scheduling-settings.dto';
import { CreateSchedulingSettingsUseCase } from '@/scheduling-settings/application/use-cases/create-scheduling-settings.use-case';
import { ListSchedulingSettingsUseCase } from '@/scheduling-settings/application/use-cases/list-scheduling-settings.use-case';
import { GetSchedulingSettingsByIdUseCase } from '@/scheduling-settings/application/use-cases/get-scheduling-settings-by-id.use-case';
import { UpdateSchedulingSettingsUseCase } from '@/scheduling-settings/application/use-cases/update-scheduling-settings.use-case';
import { ParseIdPipe } from '@/user/interfaces/http/pipes/parse-id.pipe';

/**
 * Global scheduling settings controller.
 *
 * This resource is a singleton: at most ONE record can exist (eventually one
 * per company). For that reason there is intentionally NO DELETE endpoint: the
 * scheduling settings cannot be removed, only updated.
 */
@Controller('scheduling-settings')
export class SchedulingSettingsController {
  constructor(
    private readonly createUseCase: CreateSchedulingSettingsUseCase,
    private readonly listUseCase: ListSchedulingSettingsUseCase,
    private readonly getByIdUseCase: GetSchedulingSettingsByIdUseCase,
    private readonly updateUseCase: UpdateSchedulingSettingsUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateSchedulingSettingsDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listUseCase.execute();
  }

  @Get(':id')
  getById(@Param('id', ParseIdPipe) id: number) {
    return this.getByIdUseCase.execute(id);
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateSchedulingSettingsDto) {
    return this.updateUseCase.execute(id, dto);
  }
}
