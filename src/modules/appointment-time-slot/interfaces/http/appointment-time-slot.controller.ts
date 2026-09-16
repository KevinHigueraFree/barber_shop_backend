import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAppointmentTimeSlotDto } from '@/modules/appointment-time-slot/application/dtos/create-appointment-time-slot.dto';
import { CreateAppointmentTimeSlotUseCase } from '@/modules/appointment-time-slot/application/use-cases/create-appointment-time-slot.use-case';
import { DeleteAppointmentTimeSlotUseCase } from '@/modules/appointment-time-slot/application/use-cases/delete-appointment-time-slot.use-case';
import { GetAppointmentTimeSlotUseCase } from '@/modules/appointment-time-slot/application/use-cases/get-appointment-time-slot.use-case';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';

@Controller('appointment-time-slots')
export class AppointmentTimeSlotController {
  constructor(
    private readonly createUseCase: CreateAppointmentTimeSlotUseCase,
    private readonly getUseCase: GetAppointmentTimeSlotUseCase,
    private readonly deleteUseCase: DeleteAppointmentTimeSlotUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateAppointmentTimeSlotDto) {
    return this.createUseCase.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getUseCase.execute(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteUseCase.execute(id);
  }
}
