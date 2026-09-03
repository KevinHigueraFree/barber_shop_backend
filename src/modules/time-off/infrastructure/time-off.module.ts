import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades e Infraestructura de TimeOff
import { TypeOrmTimeOffEntity } from '@/modules/time-off/infrastructure/persistence/typeorm-time-off.entity';
import { TypeOrmTimeOffRepository } from '@/modules/time-off/infrastructure/persistence/typeorm-time-off.repository';
import { TIME_OFF_REPOSITORY } from '@/modules/time-off/domain/repositories/time-off.repository';

// Casos de Uso de TimeOff
import { CreateTimeOffUseCase } from '@/modules/time-off/application/use-cases/create-time-off.use-case';
import { GetTimeOffUseCase } from '@/modules/time-off/application/use-cases/get-time-off.use-case';
import { ListTimeOffsUseCase } from '@/modules/time-off/application/use-cases/list-time-offs.use-case';
import { UpdateTimeOffUseCase } from '@/modules/time-off/application/use-cases/update-time-off.use-case';
import { DeleteTimeOffUseCase } from '@/modules/time-off/application/use-cases/delete-time-off.use-case';

// Controlador (Ajusta la ruta según dónde tengas tu TimeOffController)

// Dependencia cruzada: Necesitamos el UserModule para validar al staff_id
import { UserModule } from '@/modules/user/infrastructure/user.module';
import { TimeOffController } from '@/modules/time-off/interfaces/http/time-off.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmTimeOffEntity]),
    UserModule, // 👈 Importante para que NestJS sepa resolver el USER_REPOSITORY inyectado en los casos de uso
  ],
  controllers: [TimeOffController],
  providers: [
    // 1. Casos de Uso
    CreateTimeOffUseCase,
    GetTimeOffUseCase,
    ListTimeOffsUseCase,
    UpdateTimeOffUseCase,
    DeleteTimeOffUseCase,

    // 2. Enlace de la interfaz del Repositorio con su implementación en TypeORM
    {
      provide: TIME_OFF_REPOSITORY,
      useClass: TypeOrmTimeOffRepository,
    },
  ],
  exports: [
    // Opcional: si otro módulo (ej. Citas / Appointments) necesita consultar los permisos o tiempos libres
    TIME_OFF_REPOSITORY,
  ],
})
export class TimeOffModule {}
