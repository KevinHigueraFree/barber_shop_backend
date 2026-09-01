import { Inject, Injectable } from '@nestjs/common';
import { UpdateActionDto } from '@/action/application/dtos/update-action.dto';
import { Action } from '@/action/domain/entities/action.entity';
import { UpdateAction } from '@/action/domain/entities/update-action';
import {
  ACTION_REPOSITORY,
  type ActionRepository,
} from '@/action/domain/repositories/action.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class UpdateActionUseCase {
  constructor(
    @Inject(ACTION_REPOSITORY)
    private readonly actionRepository: ActionRepository,
  ) {}

  async execute(id: number, dto: UpdateActionDto): Promise<Action> {
    const existing = await this.actionRepository.findById(id);
    if (!existing) {
      throw new EntityNotFoundException('action', id);
    }

    const targetName = dto.name ?? existing.name;

    if (targetName !== existing.name) {
      const duplicated = await this.actionRepository.findByName(targetName);
      if (duplicated && duplicated.id !== id) {
        throw new ConflictDomainException('The action name is already registered');
      }
    }

    const updateAction = new UpdateAction(id, targetName);
    return this.actionRepository.update(updateAction);
  }
}
