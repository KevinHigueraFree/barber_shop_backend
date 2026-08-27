import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTimeSlotDto } from '@/time-slot/application/dtos/create-time-slot.dto';
import { UpdateTimeSlotDto } from '@/time-slot/application/dtos/update-time-slot.dto';
import { CreateTimeSlotUseCase } from '@/time-slot/application/use-cases/create-time-slot.use-case';
import { DeleteTimeSlotUseCase } from '@/time-slot/application/use-cases/delete-time-slot.use-case';
import { GetTimeSlotUseCase } from '@/time-slot/application/use-cases/get-time-slot.use-case';
import { ListTimeSlotsUseCase } from '@/time-slot/application/use-cases/list-time-slots.use-case';
import { UpdateTimeSlotUseCase } from '@/time-slot/application/use-cases/update-time-slot.use-case';
import { ParseIdPipe } from '@/service/interfaces/http/pipes/parse-id.pipe';

@Controller('time-slots')
export class TimeSlotController {
  constructor(
    private readonly createTimeSlotUseCase: CreateTimeSlotUseCase,
    private readonly getTimeSlotUseCase: GetTimeSlotUseCase,
    private readonly listTimeSlotsUseCase: ListTimeSlotsUseCase,
    private readonly updateTimeSlotUseCase: UpdateTimeSlotUseCase,
    private readonly deleteTimeSlotUseCase: DeleteTimeSlotUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTimeSlotDto) {
    return this.createTimeSlotUseCase.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getTimeSlotUseCase.execute(id);
  }

  @Get()
  findAll() {
    return this.listTimeSlotsUseCase.execute();
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateTimeSlotDto) {
    return this.updateTimeSlotUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteTimeSlotUseCase.execute(id);
  }
}
