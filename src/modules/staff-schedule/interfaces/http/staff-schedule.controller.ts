import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateStaffScheduleDto } from '@/modules/staff-schedule/application/dtos/create-staff-schedule.dto';
import { UpdateStaffScheduleDto } from '@/modules/staff-schedule/application/dtos/update-staff-schedule.dto';
import { CreateStaffScheduleUseCase } from '@/modules/staff-schedule/application/use-cases/create-staff-schedule.use-case';
import { DeleteStaffScheduleUseCase } from '@/modules/staff-schedule/application/use-cases/delete-staff-schedule.use-case';
import { GetStaffScheduleUseCase } from '@/modules/staff-schedule/application/use-cases/get-staff-schedule.use-case';
import { ListStaffSchedulesUseCase } from '@/modules/staff-schedule/application/use-cases/list-staff-schedules.use-case';
import { UpdateStaffScheduleUseCase } from '@/modules/staff-schedule/application/use-cases/update-staff-schedule.use-case';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';

@Controller('staff-schedules')
export class StaffScheduleController {
  constructor(
    private readonly createUseCase: CreateStaffScheduleUseCase,
    private readonly getUseCase: GetStaffScheduleUseCase,
    private readonly listSchedulesUseCase: ListStaffSchedulesUseCase,
    private readonly updateUseCase: UpdateStaffScheduleUseCase,
    private readonly deleteUseCase: DeleteStaffScheduleUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateStaffScheduleDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listSchedulesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getUseCase.execute(id);
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateStaffScheduleDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteUseCase.execute(id);
  }
}
