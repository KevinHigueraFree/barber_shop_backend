import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmServiceEntity } from '@/service/infrastructure/persistence/typeorm-service.entity';
import { ServiceController } from '@/service/interfaces/http/service.controller';
import { CreateServiceUseCase } from '@/service/application/use-cases/create-service.use-case';
import { GetServiceUseCase } from '@/service/application/use-cases/get-service.use-case';
import { ListServicesUseCase } from '@/service/application/use-cases/list-service.use-case';
import { UpdateServiceUseCase } from '@/service/application/use-cases/update-service.use-case';
import { DeleteServiceUseCase } from '@/service/application/use-cases/delete-service.use-case';
import { ValidIdGuard } from '@/service/interfaces/http/guards/valid-id.guard';
import { SERVICE_REPOSITORY } from '@/service/domain/repositories/service.repository';
import { TypeOrmServiceRepository } from '@/service/infrastructure/persistence/typeorm-service.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmServiceEntity])],
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
})
export class ServiceModule {}
