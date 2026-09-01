import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSchedulingSettingDto } from '@/scheduling-setting/application/dtos/create-scheduling-setting.dto';
import { UpdateSchedulingSettingDto } from '@/scheduling-setting/application/dtos/update-scheduling-setting.dto';
import { CreateSchedulingSettingUseCase } from '@/scheduling-setting/application/use-cases/create-scheduling-setting.use-case';
import { ListSchedulingSettingsUseCase } from '@/scheduling-setting/application/use-cases/list-scheduling-settings.use-case';
import { GetSchedulingSettingByIdUseCase } from '@/scheduling-setting/application/use-cases/get-scheduling-setting-by-id.use-case';
import { UpdateSchedulingSettingUseCase } from '@/scheduling-setting/application/use-cases/update-scheduling-setting.use-case';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';

/**
 * Global scheduling settings controller.
 *
 * This resource is a singleton: at most ONE record can exist (eventually one
 * per company). For that reason there is intentionally NO DELETE endpoint: the
 * scheduling settings cannot be removed, only updated.
 */
@Controller('scheduling-settings')
export class SchedulingSettingController {
  constructor(
    private readonly createUseCase: CreateSchedulingSettingUseCase,
    private readonly listSchedulingSettingsUseCase: ListSchedulingSettingsUseCase,
    private readonly getByIdUseCase: GetSchedulingSettingByIdUseCase,
    private readonly updateUseCase: UpdateSchedulingSettingUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateSchedulingSettingDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listSchedulingSettingsUseCase.execute();
  }

  @Get(':id')
  getById(@Param('id', ParseIdPipe) id: number) {
    return this.getByIdUseCase.execute(id);
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateSchedulingSettingDto) {
    return this.updateUseCase.execute(id, dto);
  }
}
