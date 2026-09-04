import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetAppointmentStatusUseCase } from '@/modules/appointment-status/application/use-cases/get-appointment-status.use-case';
import { ListAppointmentStatusesUseCase } from '@/modules/appointment-status/application/use-cases/list-appointment-statuses.use-case';
import { APPOINTMENT_STATUS_REPOSITORY } from '@/modules/appointment-status/domain/repositories/appointment-status.repository';
import { TypeOrmAppointmentStatusEntity } from '@/modules/appointment-status/infrastructure/persistence/typeorm-appointment-status.entity';
import { TypeOrmAppointmentStatusRepository } from '@/modules/appointment-status/infrastructure/persistence/typeorm-appointment-status.repository';
import { AppointmentStatusController } from '@/modules/appointment-status/interfaces/http/appointment-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmAppointmentStatusEntity])],
  controllers: [AppointmentStatusController],
  providers: [
    GetAppointmentStatusUseCase,
    ListAppointmentStatusesUseCase,
    {
      provide: APPOINTMENT_STATUS_REPOSITORY,
      useClass: TypeOrmAppointmentStatusRepository,
    },
  ],
  exports: [APPOINTMENT_STATUS_REPOSITORY],
})
export class AppointmentStatusModule {}
