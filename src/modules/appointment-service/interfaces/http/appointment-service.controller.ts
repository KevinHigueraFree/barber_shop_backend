import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAppointmentServiceDto } from '@/modules/appointment-service/application/dtos/create-appointment-service.dto';
import { CreateAppointmentServiceUseCase } from '@/modules/appointment-service/application/use-cases/create-appointment-service.use-case';
import { DeleteAppointmentServiceUseCase } from '@/modules/appointment-service/application/use-cases/delete-appointment-service.use-case';
import { GetAppointmentServiceUseCase } from '@/modules/appointment-service/application/use-cases/get-appointment-service.use-case';
import { ListAppointmentServicesUseCase } from '@/modules/appointment-service/application/use-cases/list-appointment-services.use-case';
import { ParseIdPipe } from '@/shared/interfaces/http/pipes/parse-id.pipe';

@Controller('appointment-services')
export class AppointmentServiceController {
  constructor(
    private readonly createUseCase: CreateAppointmentServiceUseCase,
    private readonly getUseCase: GetAppointmentServiceUseCase,
    private readonly listUseCase: ListAppointmentServicesUseCase,
    private readonly deleteUseCase: DeleteAppointmentServiceUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateAppointmentServiceDto) {
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

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteUseCase.execute(id);
  }
}
