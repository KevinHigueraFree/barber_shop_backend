import { Inject, Injectable } from '@nestjs/common';
import { Action } from '@/action/domain/entities/action.entity';
import {
  ACTION_REPOSITORY,
  type ActionRepository,
} from '@/action/domain/repositories/action.repository';

@Injectable()
export class ListActionsUseCase {
  constructor(
    @Inject(ACTION_REPOSITORY)
    private readonly actionRepository: ActionRepository,
  ) {}

  async execute(): Promise<Action[]> {
    return this.actionRepository.findAll();
  }
}
