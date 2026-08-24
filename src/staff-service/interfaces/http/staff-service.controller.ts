import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateStaffServiceDto } from '@/staff-service/application/dtos/create-staff-service.dto';
import { CreateStaffServiceUseCase } from '@/staff-service/application/use-cases/create-staff-service.use-case';
import { DeleteStaffServiceUseCase } from '@/staff-service/application/use-cases/delete-staff-service.use-case';
import { GetStaffServiceUseCase } from '@/staff-service/application/use-cases/get-staff-service.use-case';
import { ListStaffServiceUseCase } from '@/staff-service/application/use-cases/list-staff-service.use-case';
import { ParseIdPipe } from '@/user/interfaces/http/pipes/parse-id.pipe';

@Controller('staff-service')
export class StaffServiceController {
  constructor(
    private readonly createUseCase: CreateStaffServiceUseCase,
    private readonly getUseCase: GetStaffServiceUseCase,
    private readonly listUseCase: ListStaffServiceUseCase,
    private readonly deleteUseCase: DeleteStaffServiceUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateStaffServiceDto) {
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
