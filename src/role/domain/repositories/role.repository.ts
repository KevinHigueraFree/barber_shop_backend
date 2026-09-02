import { Role } from '@/role/domain/entities/role.entity';
import { NewRole } from '@/role/domain/entities/new-role';
import { UpdateRole } from '@/role/domain/entities/update-role';

export interface RoleRepository {
  create(role: NewRole): Promise<Role>;
  findById(id: number): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  update(role: UpdateRole): Promise<Role>;
  deleteById(id: number): Promise<Role | null>;
}

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';
