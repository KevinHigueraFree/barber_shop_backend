import { Inject, Injectable } from '@nestjs/common';
import { Action } from '@/action/domain/entities/action.entity';
import {
  ACTION_REPOSITORY,
  type ActionRepository,
} from '@/action/domain/repositories/action.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class DeleteActionUseCase {
  constructor(
    @Inject(ACTION_REPOSITORY)
    private readonly actionRepository: ActionRepository,
  ) {}

  async execute(id: number): Promise<Action> {
    const deleted = await this.actionRepository.deleteById(id);
    if (!deleted) {
      throw new EntityNotFoundException('action', id);
    }

    return deleted;
  }
}
