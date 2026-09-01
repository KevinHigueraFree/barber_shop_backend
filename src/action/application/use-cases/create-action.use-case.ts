import { Inject, Injectable } from '@nestjs/common';
import { CreateActionDto } from '@/action/application/dtos/create-action.dto';
import { Action } from '@/action/domain/entities/action.entity';
import { NewAction } from '@/action/domain/entities/new-action';
import {
  ACTION_REPOSITORY,
  type ActionRepository,
} from '@/action/domain/repositories/action.repository';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateActionUseCase {
  constructor(
    @Inject(ACTION_REPOSITORY)
    private readonly actionRepository: ActionRepository,
  ) {}

  async execute(dto: CreateActionDto): Promise<Action> {
    const existing = await this.actionRepository.findByName(dto.name);
    if (existing) {
      throw new ConflictDomainException('The action name is already registered');
    }

    const newAction = new NewAction(dto.name);
    return this.actionRepository.create(newAction);
  }
}
