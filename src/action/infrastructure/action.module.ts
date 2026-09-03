import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListActionsUseCase } from '@/action/application/use-cases/list-actions.use-case';
import { ACTION_REPOSITORY } from '@/action/domain/repositories/action.repository';
import { TypeOrmActionEntity } from '@/action/infrastructure/persistence/typeorm-action.entity';
import { TypeOrmActionRepository } from '@/action/infrastructure/persistence/typeorm-action.repository';
import { ActionController } from '@/action/interfaces/http/action.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmActionEntity])],
  controllers: [ActionController],
  providers: [
    ListActionsUseCase,
    {
      provide: ACTION_REPOSITORY,
      useClass: TypeOrmActionRepository,
    },
  ],
  exports: [ACTION_REPOSITORY],
})
export class ActionModule {}
