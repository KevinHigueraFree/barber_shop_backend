import { DataSource, In } from 'typeorm';
import { TypeOrmPermissionEntity } from '@/modules/permission/infrastructure/persistence/typeorm-permission.entity';
import { TypeOrmModuleEntity } from '@/modules/module/infrastructure/persistence/typeorm-module.entity';
import { TypeOrmActionEntity } from '@/modules/action/infrastructure/persistence/typeorm-action.entity';

export const permissionCatalog = [
  // appointment-status -> read only
  { id: 1, moduleId: 1, actionId: 1 },

  // scheduling-setting -> read, create, update
  { id: 2, moduleId: 2, actionId: 1 },
  { id: 3, moduleId: 2, actionId: 2 },
  { id: 4, moduleId: 2, actionId: 3 },

  // service -> read, create, update, delete
  { id: 5, moduleId: 3, actionId: 1 },
  { id: 6, moduleId: 3, actionId: 2 },
  { id: 7, moduleId: 3, actionId: 3 },
  { id: 8, moduleId: 3, actionId: 4 },

  // staff-schedule -> read, create, update, delete
  { id: 9, moduleId: 4, actionId: 1 },
  { id: 10, moduleId: 4, actionId: 2 },
  { id: 11, moduleId: 4, actionId: 3 },
  { id: 12, moduleId: 4, actionId: 4 },

  // staff-service -> read, create, delete
  { id: 13, moduleId: 5, actionId: 1 },
  { id: 14, moduleId: 5, actionId: 2 },
  { id: 15, moduleId: 5, actionId: 4 },

  // time-off -> read, create, update, delete
  { id: 16, moduleId: 6, actionId: 1 },
  { id: 17, moduleId: 6, actionId: 2 },
  { id: 18, moduleId: 6, actionId: 3 },
  { id: 19, moduleId: 6, actionId: 4 },

  // time-slot -> read, create, update, delete
  { id: 20, moduleId: 7, actionId: 1 },
  { id: 21, moduleId: 7, actionId: 2 },
  { id: 22, moduleId: 7, actionId: 3 },
  { id: 23, moduleId: 7, actionId: 4 },

  // user -> read, create, update, delete
  { id: 24, moduleId: 8, actionId: 1 },
  { id: 25, moduleId: 8, actionId: 2 },
  { id: 26, moduleId: 8, actionId: 3 },
  { id: 27, moduleId: 8, actionId: 4 },

  // role -> read, create, update, delete
  { id: 28, moduleId: 9, actionId: 1 },
  { id: 29, moduleId: 9, actionId: 2 },
  { id: 30, moduleId: 9, actionId: 3 },
  { id: 31, moduleId: 9, actionId: 4 },

  // appointment -> read, create, update, delete
  { id: 32, moduleId: 10, actionId: 1 },
  { id: 33, moduleId: 10, actionId: 2 },
  { id: 34, moduleId: 10, actionId: 3 },
  { id: 35, moduleId: 10, actionId: 4 },

  // appointment-service -> read, create, delete
  { id: 36, moduleId: 11, actionId: 1 },
  { id: 37, moduleId: 11, actionId: 2 },
  { id: 38, moduleId: 11, actionId: 4 },

  // role-permission -> read, create, delete
  { id: 39, moduleId: 12, actionId: 1 },
  { id: 40, moduleId: 12, actionId: 2 },
  { id: 41, moduleId: 12, actionId: 4 },

  // permission -> read only
  { id: 42, moduleId: 13, actionId: 1 },

  // module -> read only
  { id: 43, moduleId: 14, actionId: 1 },

  // action -> read only
  { id: 44, moduleId: 15, actionId: 1 },
];

export async function seedPermissions(dataSource: DataSource) {
  await dataSource.transaction(async (manager) => {
    const permissionRepo = manager.getRepository(TypeOrmPermissionEntity);
    const moduleRepo = manager.getRepository(TypeOrmModuleEntity);
    const actionRepo = manager.getRepository(TypeOrmActionEntity);

    const expectedModuleIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
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
      where: [
        ...permissionCatalog.map(({ moduleId, actionId }) => ({ moduleId, actionId })),
        { id: In(permissionCatalog.map(({ id }) => id)) },
      ],
      select: ['id', 'moduleId', 'actionId', 'deletedAt'],
      withDeleted: true,
    });

    const existingPairs = new Set(
      existingPermissions
        .filter((permission) => !permission.deletedAt)
        .map((permission) => `${permission.moduleId}:${permission.actionId}`),
    );

    const toCreate = permissionCatalog.filter(
      ({ moduleId, actionId }) => !existingPairs.has(`${moduleId}:${actionId}`),
    );

    for (const permission of toCreate) {
      const existing = existingPermissions.find(
        (item) =>
          item.id === permission.id ||
          (item.moduleId === permission.moduleId && item.actionId === permission.actionId),
      );

      if (
        existing &&
        !existing.deletedAt &&
        existing.actionId !== permission.actionId &&
        existing.moduleId !== permission.moduleId
      ) {
        throw new Error(
          `No se puede sembrar el permiso ${permission.id}: el ID ya está ocupado por otro permiso activo.`,
        );
      }

      if (existing?.deletedAt) {
        await permissionRepo.restore(existing.id);
      } else if (!existing) {
        await manager.query(
          'INSERT INTO "permission" ("id", "module_id", "action_id") VALUES ($1, $2, $3)',
          [permission.id, permission.moduleId, permission.actionId],
        );
      }
    }
  });
}
