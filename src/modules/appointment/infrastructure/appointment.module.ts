import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/modules/user/infrastructure/user.module';
import { AppointmentStatusModule } from '@/modules/appointment-status/infrastructure/appointment-status.module';
import { TypeOrmAppointmentEntity } from '@/modules/appointment/infrastructure/persistence/typeorm-appointment.entity';
import { TypeOrmAppointmentRepository } from '@/modules/appointment/infrastructure/persistence/typeorm-appointment.repository';
import { APPOINTMENT_REPOSITORY } from '@/modules/appointment/domain/repositories/appointment.repository';
import { CreateAppointmentUseCase } from '@/modules/appointment/application/use-cases/create-appointment.use-case';
import { GetAppointmentUseCase } from '@/modules/appointment/application/use-cases/get-appointment.use-case';
import { ListAppointmentsUseCase } from '@/modules/appointment/application/use-cases/list-appointments.use-case';
import { DeleteAppointmentUseCase } from '@/modules/appointment/application/use-cases/delete-appointment.use-case';
import { UpdateAppointmentStatusUseCase } from '@/modules/appointment/application/use-cases/update-appointment-status.use-case';
import { AppointmentController } from '@/modules/appointment/interfaces/http/appointment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmAppointmentEntity]),
    UserModule,
    AppointmentStatusModule,
  ],
  controllers: [AppointmentController],
  providers: [
    CreateAppointmentUseCase,
    GetAppointmentUseCase,
    ListAppointmentsUseCase,
    DeleteAppointmentUseCase,
    UpdateAppointmentStatusUseCase,
    { provide: APPOINTMENT_REPOSITORY, useClass: TypeOrmAppointmentRepository },
  ],
})
export class AppointmentModule {}
