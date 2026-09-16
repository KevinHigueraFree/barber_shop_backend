import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from '@/modules/appointment/infrastructure/appointment.module';
import { TimeSlotModule } from '@/modules/time-slot/infrastructure/time-slot.module';
import { CreateAppointmentTimeSlotUseCase } from '@/modules/appointment-time-slot/application/use-cases/create-appointment-time-slot.use-case';
import { DeleteAppointmentTimeSlotUseCase } from '@/modules/appointment-time-slot/application/use-cases/delete-appointment-time-slot.use-case';
import { GetAppointmentTimeSlotUseCase } from '@/modules/appointment-time-slot/application/use-cases/get-appointment-time-slot.use-case';
import { APPOINTMENT_TIME_SLOT_REPOSITORY } from '@/modules/appointment-time-slot/domain/repositories/appointment-time-slot.repository';
import { TypeOrmAppointmentTimeSlotEntity } from '@/modules/appointment-time-slot/infrastructure/persistence/typeorm-appointment-time-slot.entity';
import { TypeOrmAppointmentTimeSlotRepository } from '@/modules/appointment-time-slot/infrastructure/persistence/typeorm-appointment-time-slot.repository';
import { AppointmentTimeSlotController } from '@/modules/appointment-time-slot/interfaces/http/appointment-time-slot.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmAppointmentTimeSlotEntity]),
    AppointmentModule,
    TimeSlotModule,
  ],
  controllers: [AppointmentTimeSlotController],
  providers: [
    CreateAppointmentTimeSlotUseCase,
    GetAppointmentTimeSlotUseCase,
    DeleteAppointmentTimeSlotUseCase,
    {
      provide: APPOINTMENT_TIME_SLOT_REPOSITORY,
      useClass: TypeOrmAppointmentTimeSlotRepository,
    },
  ],
})
export class AppointmentTimeSlotModule {}
