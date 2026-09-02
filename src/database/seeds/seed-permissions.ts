import { DataSource, In } from 'typeorm';
import { TypeOrmPermissionEntity } from '@/permission/infrastructure/persistence/typeorm-permission.entity';
import { TypeOrmModuleEntity } from '@/module/infrastructure/persistence/typeorm-module.entity';
import { TypeOrmActionEntity } from '@/action/infrastructure/persistence/typeorm-action.entity';

export const permissionCatalog = [
  // appointment-status
  { id: 1, moduleId: 1, actionId: 1 },
  { id: 2, moduleId: 1, actionId: 2 },
  { id: 3, moduleId: 1, actionId: 3 },
  { id: 4, moduleId: 1, actionId: 4 },

  // scheduling-setting
  { id: 5, moduleId: 2, actionId: 1 },
  { id: 6, moduleId: 2, actionId: 3 },

  // service
  { id: 7, moduleId: 3, actionId: 1 },
  { id: 8, moduleId: 3, actionId: 2 },
  { id: 9, moduleId: 3, actionId: 3 },
  { id: 10, moduleId: 3, actionId: 4 },

  // staff-schedule
  { id: 11, moduleId: 4, actionId: 1 },
  { id: 12, moduleId: 4, actionId: 2 },
  { id: 13, moduleId: 4, actionId: 3 },
  { id: 14, moduleId: 4, actionId: 4 },

  // staff-service
  { id: 15, moduleId: 5, actionId: 1 },
  { id: 16, moduleId: 5, actionId: 2 },
  { id: 17, moduleId: 5, actionId: 3 },
  { id: 18, moduleId: 5, actionId: 4 },

  // time-off
  { id: 19, moduleId: 6, actionId: 1 },
  { id: 20, moduleId: 6, actionId: 2 },
  { id: 21, moduleId: 6, actionId: 3 },
  { id: 22, moduleId: 6, actionId: 4 },

  // time-slot
  { id: 23, moduleId: 7, actionId: 1 },
  { id: 24, moduleId: 7, actionId: 2 },
  { id: 25, moduleId: 7, actionId: 3 },
  { id: 26, moduleId: 7, actionId: 4 },

  // user
  { id: 27, moduleId: 8, actionId: 1 },
  { id: 28, moduleId: 8, actionId: 2 },
  { id: 29, moduleId: 8, actionId: 3 },
  { id: 30, moduleId: 8, actionId: 4 },

  // role
  { id: 31, moduleId: 9, actionId: 1 },
  { id: 32, moduleId: 9, actionId: 2 },
  { id: 33, moduleId: 9, actionId: 3 },
  { id: 34, moduleId: 9, actionId: 4 },
];

export async function seedPermissions(dataSource: DataSource) {
  const permissionRepo = dataSource.getRepository(TypeOrmPermissionEntity);
  const moduleRepo = dataSource.getRepository(TypeOrmModuleEntity);
  const actionRepo = dataSource.getRepository(TypeOrmActionEntity);

  const expectedModuleIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const expectedActionIds = [1, 2, 3, 4];

  const modules = await moduleRepo.find({
    where: { id: In(expectedModuleIds) },
    select: ['id'],
  });

  const actions = await actionRepo.find({
    where: { id: In(expectedActionIds) },
    select: ['id'],
  });

  const existingModuleIds = new Set(modules.map((m) => m.id));
  const existingActionIds = new Set(actions.map((a) => a.id));

  const missingModules = expectedModuleIds.filter((id) => !existingModuleIds.has(id));
  const missingActions = expectedActionIds.filter((id) => !existingActionIds.has(id));

  if (missingModules.length > 0 || missingActions.length > 0) {
    throw new Error(
      `IDs inválidos para permisos. Módulos faltantes: ${missingModules.join(', ')}. Acciones faltantes: ${missingActions.join(', ')}`,
    );
  }

  const existingPermissions = await permissionRepo.find({
    where: permissionCatalog.map(({ moduleId, actionId }) => ({ moduleId, actionId })),
    select: ['moduleId', 'actionId'],
  });

  const existingPairs = new Set(
    existingPermissions.map((permission) => `${permission.moduleId}:${permission.actionId}`),
  );

  const toCreate = permissionCatalog.filter(
    ({ moduleId, actionId }) => !existingPairs.has(`${moduleId}:${actionId}`),
  );

  if (toCreate.length > 0) {
    await permissionRepo.insert(toCreate);
  }
}
