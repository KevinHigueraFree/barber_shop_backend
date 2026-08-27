import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from '@/service/infrastructure/service.module';
import { UserModule } from '@/user/infrastructure/user.module';
import { CreateStaffServiceUseCase } from '@/staff-service/application/use-cases/create-staff-service.use-case';
import { DeleteStaffServiceUseCase } from '@/staff-service/application/use-cases/delete-staff-service.use-case';
import { GetStaffServiceUseCase } from '@/staff-service/application/use-cases/get-staff-service.use-case';
import { ListStaffServicesUseCase } from '@/staff-service/application/use-cases/list-staff-services.use-case';
import { STAFF_SERVICE_REPOSITORY } from '@/staff-service/domain/repositories/staff-service.repository';
import { TypeOrmStaffServiceEntity } from '@/staff-service/infrastructure/persistence/typeorm-staff-service.entity';
import { TypeOrmStaffServiceRepository } from '@/staff-service/infrastructure/persistence/typeorm-staff-service.repository';
import { StaffServiceController } from '@/staff-service/interfaces/http/staff-service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmStaffServiceEntity]), UserModule, ServiceModule],
  controllers: [StaffServiceController],
  providers: [
    CreateStaffServiceUseCase,
    GetStaffServiceUseCase,
    ListStaffServicesUseCase,
    DeleteStaffServiceUseCase,
    {
      provide: STAFF_SERVICE_REPOSITORY,
      useClass: TypeOrmStaffServiceRepository,
    },
  ],
})
export class StaffServiceModule {}
