import { DataSource } from 'typeorm';
import { TypeOrmModuleEntity } from '@/modules/module/infrastructure/persistence/typeorm-module.entity';

export const moduleCatalog = [
  { id: 1, name: 'appointment-status' },
  { id: 2, name: 'scheduling-setting' },
  { id: 3, name: 'service' },
  { id: 4, name: 'staff-schedule' },
  { id: 5, name: 'staff-service' },
  { id: 6, name: 'time-off' },
  { id: 7, name: 'time-slot' },
  { id: 8, name: 'user' },
  { id: 9, name: 'role' },
];

export async function seedModules(dataSource: DataSource) {
  await dataSource.transaction(async (manager) => {
    const moduleRepo = manager.getRepository(TypeOrmModuleEntity);

    for (const module of moduleCatalog) {
      const existingByName = await moduleRepo.findOne({
        where: { name: module.name },
        withDeleted: true,
      });
      const existingById = await moduleRepo.findOne({
        where: { id: module.id },
        withDeleted: true,
      });
      const existing = existingByName ?? existingById;

      if (existing && !existing.deletedAt && existing.name !== module.name) {
        throw new Error(
          `No se puede sembrar el módulo ${module.name}: el ID ${module.id} ya está ocupado por otro módulo activo.`,
        );
      }

      if (existing?.deletedAt) {
        await moduleRepo.restore(existing.id);
      } else if (!existing) {
        await manager.query('INSERT INTO "module" ("id", "name") VALUES ($1, $2)', [
          module.id,
          module.name,
        ]);
      }
    }

    await manager.query(`
      SELECT setval(
        pg_get_serial_sequence('"module"', 'id'),
        COALESCE((SELECT MAX("id") FROM "module"), 1),
        true
      )
    `);
  });
}
