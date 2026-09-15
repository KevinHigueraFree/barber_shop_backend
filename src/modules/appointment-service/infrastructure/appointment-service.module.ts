import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from '@/modules/appointment/infrastructure/appointment.module';
import { ServiceModule } from '@/modules/service/infrastructure/service.module';
import { CreateAppointmentServiceUseCase } from '@/modules/appointment-service/application/use-cases/create-appointment-service.use-case';
import { DeleteAppointmentServiceUseCase } from '@/modules/appointment-service/application/use-cases/delete-appointment-service.use-case';
import { GetAppointmentServiceUseCase } from '@/modules/appointment-service/application/use-cases/get-appointment-service.use-case';
import { ListAppointmentServicesUseCase } from '@/modules/appointment-service/application/use-cases/list-appointment-services.use-case';
import { APPOINTMENT_SERVICE_REPOSITORY } from '@/modules/appointment-service/domain/repositories/appointment-service.repository';
import { TypeOrmAppointmentServiceEntity } from '@/modules/appointment-service/infrastructure/persistence/typeorm-appointment-service.entity';
import { TypeOrmAppointmentServiceRepository } from '@/modules/appointment-service/infrastructure/persistence/typeorm-appointment-service.repository';
import { AppointmentServiceController } from '@/modules/appointment-service/interfaces/http/appointment-service.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmAppointmentServiceEntity]),
    AppointmentModule,
    ServiceModule,
  ],
  controllers: [AppointmentServiceController],
  providers: [
    CreateAppointmentServiceUseCase,
    GetAppointmentServiceUseCase,
    ListAppointmentServicesUseCase,
    DeleteAppointmentServiceUseCase,
    {
      provide: APPOINTMENT_SERVICE_REPOSITORY,
      useClass: TypeOrmAppointmentServiceRepository,
    },
  ],
})
export class AppointmentServiceModule {}
