import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/user/infrastructure/user.module';
import { CreateStaffScheduleUseCase } from '@/staff-schedule/application/use-cases/create-staff-schedule.use-case';
import { DeleteStaffScheduleUseCase } from '@/staff-schedule/application/use-cases/delete-staff-schedule.use-case';
import { GetStaffScheduleUseCase } from '@/staff-schedule/application/use-cases/get-staff-schedule.use-case';
import { ListStaffScheduleUseCase } from '@/staff-schedule/application/use-cases/list-staff-schedule.use-case';
import { UpdateStaffScheduleUseCase } from '@/staff-schedule/application/use-cases/update-staff-schedule.use-case';
import { STAFF_SCHEDULE_REPOSITORY } from '@/staff-schedule/domain/repositories/staff-schedule.repository';
import { TypeOrmStaffScheduleEntity } from '@/staff-schedule/infrastructure/persistence/typeorm-staff-schedule.entity';
import { TypeOrmStaffScheduleRepository } from '@/staff-schedule/infrastructure/persistence/typeorm-staff-schedule.repository';
import { StaffScheduleController } from '@/staff-schedule/interfaces/http/staff-schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmStaffScheduleEntity]), UserModule],
  controllers: [StaffScheduleController],
  providers: [
    CreateStaffScheduleUseCase,
    GetStaffScheduleUseCase,
    ListStaffScheduleUseCase,
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
