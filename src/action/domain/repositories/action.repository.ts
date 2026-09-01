import { Action } from '@/action/domain/entities/action.entity';
import { NewAction } from '@/action/domain/entities/new-action';
import { UpdateAction } from '@/action/domain/entities/update-action';

export interface ActionRepository {
  create(action: NewAction): Promise<Action>;
  findById(id: number): Promise<Action | null>;
  findByName(name: string): Promise<Action | null>;
  findAll(): Promise<Action[]>;
  update(action: UpdateAction): Promise<Action>;
  deleteById(id: number): Promise<Action | null>;
}

export const ACTION_REPOSITORY = 'ACTION_REPOSITORY';
