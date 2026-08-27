import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAppointmentStatusUseCase } from '@/appointment-status/application/use-cases/create-appointment-status.use-case';
import { GetAppointmentStatusUseCase } from '@/appointment-status/application/use-cases/get-appointment-status.use-case';
import { ListAppointmentStatusesUseCase } from '@/appointment-status/application/use-cases/list-appointment-statuses.use-case';
import { UpdateAppointmentStatusUseCase } from '@/appointment-status/application/use-cases/update-appointment-status.use-case';
import { DeleteAppointmentStatusUseCase } from '@/appointment-status/application/use-cases/delete-appointment-status.use-case';
import { APPOINTMENT_STATUS_REPOSITORY } from '@/appointment-status/domain/repositories/appointment-status.repository';
import { TypeOrmAppointmentStatusEntity } from '@/appointment-status/infrastructure/persistence/typeorm-appointment-status.entity';
import { TypeOrmAppointmentStatusRepository } from '@/appointment-status/infrastructure/persistence/typeorm-appointment-status.repository';
import { AppointmentStatusController } from '@/appointment-status/interfaces/http/appointment-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmAppointmentStatusEntity])],
  controllers: [AppointmentStatusController],
  providers: [
    CreateAppointmentStatusUseCase,
    GetAppointmentStatusUseCase,
    ListAppointmentStatusesUseCase,
    UpdateAppointmentStatusUseCase,
    DeleteAppointmentStatusUseCase,
    {
      provide: APPOINTMENT_STATUS_REPOSITORY,
      useClass: TypeOrmAppointmentStatusRepository,
    },
  ],
  exports: [APPOINTMENT_STATUS_REPOSITORY],
})
export class AppointmentStatusModule {}
