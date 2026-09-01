import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateActionUseCase } from '@/action/application/use-cases/create-action.use-case';
import { DeleteActionUseCase } from '@/action/application/use-cases/delete-action.use-case';
import { GetActionUseCase } from '@/action/application/use-cases/get-action.use-case';
import { ListActionsUseCase } from '@/action/application/use-cases/list-actions.use-case';
import { UpdateActionUseCase } from '@/action/application/use-cases/update-action.use-case';
import { ACTION_REPOSITORY } from '@/action/domain/repositories/action.repository';
import { TypeOrmActionEntity } from '@/action/infrastructure/persistence/typeorm-action.entity';
import { TypeOrmActionRepository } from '@/action/infrastructure/persistence/typeorm-action.repository';
import { ActionController } from '@/action/interfaces/http/action.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmActionEntity])],
  controllers: [ActionController],
  providers: [
    CreateActionUseCase,
    GetActionUseCase,
    ListActionsUseCase,
    UpdateActionUseCase,
    DeleteActionUseCase,
    {
      provide: ACTION_REPOSITORY,
      useClass: TypeOrmActionRepository,
    },
  ],
  exports: [ACTION_REPOSITORY],
})
export class ActionModule {}
