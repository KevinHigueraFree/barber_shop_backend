import { Action } from '@/modules/action/domain/entities/action.entity';

export interface ActionRepository {
  findByName(name: string): Promise<Action | null>;
  findAll(): Promise<Action[]>;
}

export const ACTION_REPOSITORY = 'ACTION_REPOSITORY';
