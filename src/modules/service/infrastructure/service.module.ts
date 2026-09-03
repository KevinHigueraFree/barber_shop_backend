import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmServiceEntity } from '@/modules/service/infrastructure/persistence/typeorm-service.entity';
import { ServiceController } from '@/modules/service/interfaces/http/service.controller';
import { CreateServiceUseCase } from '@/modules/service/application/use-cases/create-service.use-case';
import { GetServiceUseCase } from '@/modules/service/application/use-cases/get-service.use-case';
import { ListServicesUseCase } from '@/modules/service/application/use-cases/list-services.use-case';
import { UpdateServiceUseCase } from '@/modules/service/application/use-cases/update-service.use-case';
import { DeleteServiceUseCase } from '@/modules/service/application/use-cases/delete-service.use-case';
import { ValidIdGuard } from '@/shared/interfaces/http/guards/valid-id.guard';
import { SERVICE_REPOSITORY } from '@/modules/service/domain/repositories/service.repository';
import { TypeOrmServiceRepository } from '@/modules/service/infrastructure/persistence/typeorm-service.repository';
import { SchedulingSettingModule } from '@/modules/scheduling-setting/infrastructure/scheduling-setting.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmServiceEntity]),
    forwardRef(() => SchedulingSettingModule),
  ],
  controllers: [ServiceController],
  providers: [
    CreateServiceUseCase,
    GetServiceUseCase,
    ListServicesUseCase,
    UpdateServiceUseCase,
    DeleteServiceUseCase,
    ValidIdGuard,
    {
      provide: SERVICE_REPOSITORY,
      useClass: TypeOrmServiceRepository,
    },
  ],
  exports: [SERVICE_REPOSITORY],
})
export class ServiceModule {}
