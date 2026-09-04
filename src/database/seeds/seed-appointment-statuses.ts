import { DataSource } from 'typeorm';
import { TypeOrmAppointmentStatusEntity } from '@/modules/appointment-status/infrastructure/persistence/typeorm-appointment-status.entity';

export const appointmentStatusCatalog = [
  {
    id: 1,
    name: 'scheduled',
    description: 'The appointment has been scheduled.',
    colorCode: '3498DB',
  },
  {
    id: 2,
    name: 'completed',
    description: 'The appointment has been completed.',
    colorCode: '2ECC71',
  },
  {
    id: 3,
    name: 'cancelled',
    description: 'The appointment has been cancelled.',
    colorCode: 'E74C3C',
  },
];

export async function seedAppointmentStatuses(dataSource: DataSource) {
  await dataSource.transaction(async (manager) => {
    const statusRepo = manager.getRepository(TypeOrmAppointmentStatusEntity);

    for (const status of appointmentStatusCatalog) {
      const existingByName = await statusRepo.findOne({
        where: { name: status.name },
        withDeleted: true,
      });
      const existingById = await statusRepo.findOne({
        where: { id: status.id },
        withDeleted: true,
      });
      const existing = existingByName ?? existingById;

      if (existing && !existing.deletedAt && existing.name !== status.name) {
        throw new Error(
          `Cannot seed appointment status ${status.name}: ID ${status.id} is already used by another active status.`,
        );
      }

      if (existing?.deletedAt) {
        await statusRepo.restore(existing.id);
        await statusRepo.update(existing.id, {
          name: status.name,
          description: status.description,
          colorCode: status.colorCode,
          isEnabled: true,
        });
      } else if (!existing) {
        await manager.query(
          `INSERT INTO "appointment_status" ("id", "name", "description", "color_code", "is_enabled") VALUES ($1, $2, $3, $4, $5)`,
          [status.id, status.name, status.description, status.colorCode, true],
        );
      }
    }

    await manager.query(`
      SELECT setval(
        pg_get_serial_sequence('"appointment_status"', 'id'),
        COALESCE((SELECT MAX("id") FROM "appointment_status"), 1),
        true
      )
    `);
  });
}
