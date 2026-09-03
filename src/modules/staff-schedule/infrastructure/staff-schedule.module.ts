import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/modules/user/infrastructure/user.module';
import { CreateStaffScheduleUseCase } from '@/modules/staff-schedule/application/use-cases/create-staff-schedule.use-case';
import { DeleteStaffScheduleUseCase } from '@/modules/staff-schedule/application/use-cases/delete-staff-schedule.use-case';
import { GetStaffScheduleUseCase } from '@/modules/staff-schedule/application/use-cases/get-staff-schedule.use-case';
import { ListStaffSchedulesUseCase } from '@/modules/staff-schedule/application/use-cases/list-staff-schedules.use-case';
import { UpdateStaffScheduleUseCase } from '@/modules/staff-schedule/application/use-cases/update-staff-schedule.use-case';
import { STAFF_SCHEDULE_REPOSITORY } from '@/modules/staff-schedule/domain/repositories/staff-schedule.repository';
import { TypeOrmStaffScheduleEntity } from '@/modules/staff-schedule/infrastructure/persistence/typeorm-staff-schedule.entity';
import { TypeOrmStaffScheduleRepository } from '@/modules/staff-schedule/infrastructure/persistence/typeorm-staff-schedule.repository';
import { StaffScheduleController } from '@/modules/staff-schedule/interfaces/http/staff-schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmStaffScheduleEntity]), UserModule],
  controllers: [StaffScheduleController],
  providers: [
    CreateStaffScheduleUseCase,
    GetStaffScheduleUseCase,
    ListStaffSchedulesUseCase,
    UpdateStaffScheduleUseCase,
    DeleteStaffScheduleUseCase,
    {
      provide: STAFF_SCHEDULE_REPOSITORY,
      useClass: TypeOrmStaffScheduleRepository,
    },
  ],
  exports: [STAFF_SCHEDULE_REPOSITORY],
})
export class StaffScheduleModule {}
