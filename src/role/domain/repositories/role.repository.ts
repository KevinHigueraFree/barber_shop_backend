import { Role } from '@/role/domain/entities/role.entity';
import { NewRole } from '@/role/domain/entities/new-role';
import { UpdateRole } from '@/role/domain/entities/update-role';
import { RoleWithPermissions } from '@/role/domain/read-models/role-with-permissions.read-model';

export interface RoleRepository {
  create(role: NewRole): Promise<Role>;
  findById(id: number): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  update(role: UpdateRole): Promise<Role>;
  deleteById(id: number): Promise<Role | null>;
  findByIdWithPermissions(id: number): Promise<RoleWithPermissions | null>;
}

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';
