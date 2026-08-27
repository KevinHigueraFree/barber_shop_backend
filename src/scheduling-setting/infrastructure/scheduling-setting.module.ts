import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSchedulingSettingUseCase } from '@/scheduling-setting/application/use-cases/create-scheduling-setting.use-case';
import { ListSchedulingSettingsUseCase } from '@/scheduling-setting/application/use-cases/list-scheduling-settings.use-case';
import { GetSchedulingSettingByIdUseCase } from '@/scheduling-setting/application/use-cases/get-scheduling-setting-by-id.use-case';
import { UpdateSchedulingSettingUseCase } from '@/scheduling-setting/application/use-cases/update-scheduling-setting.use-case';
import { SCHEDULING_SETTING_REPOSITORY } from '@/scheduling-setting/domain/repositories/scheduling-setting.repository';
import { TypeOrmSchedulingSettingEntity } from '@/scheduling-setting/infrastructure/persistence/typeorm-scheduling-setting.entity';
import { TypeOrmSchedulingSettingRepository } from '@/scheduling-setting/infrastructure/persistence/typeorm-scheduling-setting.repository';
import { SchedulingSettingController } from '@/scheduling-setting/interfaces/http/scheduling-setting.controller';
import { SchedulingSettingService } from '@/scheduling-setting/application/services/scheduling-setting.service';
import { ServiceModule } from '@/service/infrastructure/service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmSchedulingSettingEntity]),
    forwardRef(() => ServiceModule),
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
