import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulingSettingModule } from '@/modules/scheduling-setting/infrastructure/scheduling-setting.module';
import { CreateTimeSlotUseCase } from '@/modules/time-slot/application/use-cases/create-time-slot.use-case';
import { DeleteTimeSlotUseCase } from '@/modules/time-slot/application/use-cases/delete-time-slot.use-case';
import { GetTimeSlotUseCase } from '@/modules/time-slot/application/use-cases/get-time-slot.use-case';
import { ListTimeSlotsUseCase } from '@/modules/time-slot/application/use-cases/list-time-slots.use-case';
import { UpdateTimeSlotUseCase } from '@/modules/time-slot/application/use-cases/update-time-slot.use-case';
import { TIME_SLOT_REPOSITORY } from '@/modules/time-slot/domain/repositories/time-slot.repository';
import { TypeOrmTimeSlotEntity } from '@/modules/time-slot/infrastructure/persistence/typeorm-time-slot.entity';
import { TypeOrmTimeSlotRepository } from '@/modules/time-slot/infrastructure/persistence/typeorm-time-slot.repository';
import { TimeSlotController } from '@/modules/time-slot/interfaces/http/time-slot.controller';

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
