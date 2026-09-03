import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSchedulingSettingUseCase } from '@/modules/scheduling-setting/application/use-cases/create-scheduling-setting.use-case';
import { ListSchedulingSettingsUseCase } from '@/modules/scheduling-setting/application/use-cases/list-scheduling-settings.use-case';
import { GetSchedulingSettingByIdUseCase } from '@/modules/scheduling-setting/application/use-cases/get-scheduling-setting-by-id.use-case';
import { UpdateSchedulingSettingUseCase } from '@/modules/scheduling-setting/application/use-cases/update-scheduling-setting.use-case';
import { SCHEDULING_SETTING_REPOSITORY } from '@/modules/scheduling-setting/domain/repositories/scheduling-setting.repository';
import { TypeOrmSchedulingSettingEntity } from '@/modules/scheduling-setting/infrastructure/persistence/typeorm-scheduling-setting.entity';
import { TypeOrmSchedulingSettingRepository } from '@/modules/scheduling-setting/infrastructure/persistence/typeorm-scheduling-setting.repository';
import { SchedulingSettingController } from '@/modules/scheduling-setting/interfaces/http/scheduling-setting.controller';
import { SchedulingSettingService } from '@/modules/scheduling-setting/application/services/scheduling-setting.service';
import { ServiceModule } from '@/modules/service/infrastructure/service.module';
import { TimeSlotModule } from '@/modules/time-slot/infrastructure/time-slot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmSchedulingSettingEntity]),
    forwardRef(() => ServiceModule),
    forwardRef(() => TimeSlotModule),
  ],
  controllers: [SchedulingSettingController],
  providers: [
    CreateSchedulingSettingUseCase,
    ListSchedulingSettingsUseCase,
    GetSchedulingSettingByIdUseCase,
    UpdateSchedulingSettingUseCase,
    SchedulingSettingService,
    {
      provide: SCHEDULING_SETTING_REPOSITORY,
      useClass: TypeOrmSchedulingSettingRepository,
    },
  ],
  exports: [SCHEDULING_SETTING_REPOSITORY, SchedulingSettingService],
})
export class SchedulingSettingModule {}
