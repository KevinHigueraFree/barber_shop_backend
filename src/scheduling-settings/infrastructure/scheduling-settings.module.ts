import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSchedulingSettingsUseCase } from '@/scheduling-settings/application/use-cases/create-scheduling-settings.use-case';
import { ListSchedulingSettingsUseCase } from '@/scheduling-settings/application/use-cases/list-scheduling-settings.use-case';
import { GetSchedulingSettingsByIdUseCase } from '@/scheduling-settings/application/use-cases/get-scheduling-settings-by-id.use-case';
import { UpdateSchedulingSettingsUseCase } from '@/scheduling-settings/application/use-cases/update-scheduling-settings.use-case';
import { SCHEDULING_SETTINGS_REPOSITORY } from '@/scheduling-settings/domain/repositories/scheduling-settings.repository';
import { TypeOrmSchedulingSettingsEntity } from '@/scheduling-settings/infrastructure/persistence/typeorm-scheduling-settings.entity';
import { TypeOrmSchedulingSettingsRepository } from '@/scheduling-settings/infrastructure/persistence/typeorm-scheduling-settings.repository';
import { SchedulingSettingsController } from '@/scheduling-settings/interfaces/http/scheduling-settings.controller';
import { SchedulingSettingsService } from '@/scheduling-settings/application/services/scheduling-settings.service';
import { ServiceModule } from '@/service/infrastructure/service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmSchedulingSettingsEntity]),
    forwardRef(() => ServiceModule),
  ],
  controllers: [SchedulingSettingsController],
  providers: [
    CreateSchedulingSettingsUseCase,
    ListSchedulingSettingsUseCase,
    GetSchedulingSettingsByIdUseCase,
    UpdateSchedulingSettingsUseCase,
    SchedulingSettingsService,
    {
      provide: SCHEDULING_SETTINGS_REPOSITORY,
      useClass: TypeOrmSchedulingSettingsRepository,
    },
  ],
  exports: [SCHEDULING_SETTINGS_REPOSITORY, SchedulingSettingsService],
})
export class SchedulingSettingsModule {}
