import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateAppointmentStatusUseCase } from '@/appointment-status/application/use-cases/create-appointment-status.use-case';
import { GetAppointmentStatusUseCase } from '@/appointment-status/application/use-cases/get-appointment-status.use-case';
import { ListAppointmentStatusesUseCase } from '@/appointment-status/application/use-cases/list-appointment-statuses.use-case';
import { UpdateAppointmentStatusUseCase } from '@/appointment-status/application/use-cases/update-appointment-status.use-case';
import { DeleteAppointmentStatusUseCase } from '@/appointment-status/application/use-cases/delete-appointment-status.use-case';
import { CreateAppointmentStatusDto } from '@/appointment-status/application/dtos/create-appointment-status.dto';
import { UpdateAppointmentStatusDto } from '@/appointment-status/application/dtos/update-appointment-status.dto';
import { ParseIdPipe } from '@/user/interfaces/http/pipes/parse-id.pipe';

/**
 * Appointment status catalog controller.
 *
 * This is a catalog entity (Pending, Confirmed, Completed, Cancelled, ...):
 * `name` is unique, `colorCode` must be a HEX color and deletion is a soft
 * delete (logical), consistent with the rest of the project.
 */
@Controller('appointment-statuses')
export class AppointmentStatusController {
  constructor(
    private readonly createAppointmentStatusUseCase: CreateAppointmentStatusUseCase,
    private readonly getAppointmentStatusUseCase: GetAppointmentStatusUseCase,
    private readonly listAppointmentStatusesUseCase: ListAppointmentStatusesUseCase,
    private readonly updateAppointmentStatusUseCase: UpdateAppointmentStatusUseCase,
    private readonly deleteAppointmentStatusUseCase: DeleteAppointmentStatusUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateAppointmentStatusDto) {
    return this.createAppointmentStatusUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listAppointmentStatusesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getAppointmentStatusUseCase.execute(id);
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateAppointmentStatusDto) {
    return this.updateAppointmentStatusUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteAppointmentStatusUseCase.execute(id);
  }
}
