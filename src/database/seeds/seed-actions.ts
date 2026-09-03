import { TypeOrmActionEntity } from '@/action/infrastructure/persistence/typeorm-action.entity';
import { DataSource } from 'typeorm';

export const actionCatalog = [
  { id: 1, name: 'read' },
  { id: 2, name: 'create' },
  { id: 3, name: 'update' },
  { id: 4, name: 'delete' },
  { id: 5, name: 'cancel' },
];

export async function seedActions(dataSource: DataSource) {
  await dataSource.transaction(async (manager) => {
    const actionRepo = manager.getRepository(TypeOrmActionEntity);

    for (const action of actionCatalog) {
      const existingByName = await actionRepo.findOne({
        where: { name: action.name },
        withDeleted: true,
      });
      const existingById = await actionRepo.findOne({
        where: { id: action.id },
        withDeleted: true,
      });
      const existing = existingByName ?? existingById;

      if (existing && !existing.deletedAt && existing.name !== action.name) {
        throw new Error(
          `No se puede sembrar la acción ${action.name}: el ID ${action.id} ya está ocupado por otra acción activa.`,
        );
      }

      if (existing?.deletedAt) {
        await actionRepo.restore(existing.id);
      } else if (!existing) {
        await manager.query('INSERT INTO "action" ("id", "name") VALUES ($1, $2)', [
          action.id,
          action.name,
        ]);
      }
    }

    await manager.query(`
      SELECT setval(
        pg_get_serial_sequence('"action"', 'id'),
        COALESCE((SELECT MAX("id") FROM "action"), 1),
        true
      )
    `);
  });
}
