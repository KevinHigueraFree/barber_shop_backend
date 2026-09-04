import { Controller, Get, Param } from '@nestjs/common';
import { GetAppointmentStatusUseCase } from '@/modules/appointment-status/application/use-cases/get-appointment-status.use-case';
import { ListAppointmentStatusesUseCase } from '@/modules/appointment-status/application/use-cases/list-appointment-statuses.use-case';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';

/**
 * Appointment status catalog controller.
 *
 * Appointment statuses are managed by the database seed and exposed as read-only data.
 */
@Controller('appointment-statuses')
export class AppointmentStatusController {
  constructor(
    private readonly getAppointmentStatusUseCase: GetAppointmentStatusUseCase,
    private readonly listAppointmentStatusesUseCase: ListAppointmentStatusesUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listAppointmentStatusesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getAppointmentStatusUseCase.execute(id);
  }
}
