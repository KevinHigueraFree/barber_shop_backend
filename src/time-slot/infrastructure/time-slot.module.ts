import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulingSettingModule } from '@/scheduling-setting/infrastructure/scheduling-setting.module';
import { CreateTimeSlotUseCase } from '@/time-slot/application/use-cases/create-time-slot.use-case';
import { DeleteTimeSlotUseCase } from '@/time-slot/application/use-cases/delete-time-slot.use-case';
import { GetTimeSlotUseCase } from '@/time-slot/application/use-cases/get-time-slot.use-case';
import { ListTimeSlotsUseCase } from '@/time-slot/application/use-cases/list-time-slots.use-case';
import { UpdateTimeSlotUseCase } from '@/time-slot/application/use-cases/update-time-slot.use-case';
import { TIME_SLOT_REPOSITORY } from '@/time-slot/domain/repositories/time-slot.repository';
import { TypeOrmTimeSlotEntity } from '@/time-slot/infrastructure/persistence/typeorm-time-slot.entity';
import { TypeOrmTimeSlotRepository } from '@/time-slot/infrastructure/persistence/typeorm-time-slot.repository';
import { TimeSlotController } from '@/time-slot/interfaces/http/time-slot.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmTimeSlotEntity]),
    forwardRef(() => SchedulingSettingModule),
  ],
  controllers: [TimeSlotController],
  providers: [
    CreateTimeSlotUseCase,
    GetTimeSlotUseCase,
    ListTimeSlotsUseCase,
    UpdateTimeSlotUseCase,
    DeleteTimeSlotUseCase,
    {
      provide: TIME_SLOT_REPOSITORY,
      useClass: TypeOrmTimeSlotRepository,
    },
  ],
  exports: [TIME_SLOT_REPOSITORY],
})
export class TimeSlotModule {}
