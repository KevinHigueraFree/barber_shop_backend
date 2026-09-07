import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAppointmentDto } from '@/modules/appointment/application/dtos/create-appointment.dto';
import { UpdateAppointmentStatusDto } from '@/modules/appointment/application/dtos/update-appointment-status.dto';
import { CreateAppointmentUseCase } from '@/modules/appointment/application/use-cases/create-appointment.use-case';
import { DeleteAppointmentUseCase } from '@/modules/appointment/application/use-cases/delete-appointment.use-case';
import { GetAppointmentUseCase } from '@/modules/appointment/application/use-cases/get-appointment.use-case';
import { ListAppointmentsUseCase } from '@/modules/appointment/application/use-cases/list-appointments.use-case';
import { UpdateAppointmentStatusUseCase } from '@/modules/appointment/application/use-cases/update-appointment-status.use-case';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly createUseCase: CreateAppointmentUseCase,
    private readonly getUseCase: GetAppointmentUseCase,
    private readonly listUseCase: ListAppointmentsUseCase,
    private readonly updateStatusUseCase: UpdateAppointmentStatusUseCase,
    private readonly deleteUseCase: DeleteAppointmentUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.listUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getUseCase.execute(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateAppointmentStatusDto) {
    return this.updateStatusUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteUseCase.execute(id);
  }
}
