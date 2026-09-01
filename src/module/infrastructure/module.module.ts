import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateModuleUseCase } from '@/module/application/use-cases/create-module.use-case';
import { DeleteModuleUseCase } from '@/module/application/use-cases/delete-module.use-case';
import { GetModuleUseCase } from '@/module/application/use-cases/get-module.use-case';
import { ListModulesUseCase } from '@/module/application/use-cases/list-modules.use-case';
import { UpdateModuleUseCase } from '@/module/application/use-cases/update-module.use-case';
import { MODULE_REPOSITORY } from '@/module/domain/repositories/module.repository';
import { TypeOrmModuleEntity } from '@/module/infrastructure/persistence/typeorm-module.entity';
import { ModuleController } from '@/module/interfaces/http/module.controller';
import { TypeOrmModuleRepository } from '@/module/infrastructure/persistence/typeorm-module.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmModuleEntity])],
  controllers: [ModuleController],
  providers: [
    CreateModuleUseCase,
    GetModuleUseCase,
    ListModulesUseCase,
    UpdateModuleUseCase,
    DeleteModuleUseCase,
    {
      provide: MODULE_REPOSITORY,
      useClass: TypeOrmModuleRepository,
    },
  ],
  exports: [MODULE_REPOSITORY],
})
export class ModuleModule {}
