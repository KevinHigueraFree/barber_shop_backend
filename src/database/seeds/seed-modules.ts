import { DataSource } from 'typeorm';
import { TypeOrmModuleEntity } from '@/module/infrastructure/persistence/typeorm-module.entity';

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
  const moduleRepo = dataSource.getRepository(TypeOrmModuleEntity);

  const existingModules = await moduleRepo.find({
    where: moduleCatalog.map(({ name }) => ({ name })),
    select: ['id', 'name'],
  });

  const existingNames = new Set(existingModules.map((module) => module.name));
  const toCreate = moduleCatalog.filter(({ name }) => !existingNames.has(name));

  if (toCreate.length > 0) {
    await moduleRepo.insert(toCreate);
  }
}
