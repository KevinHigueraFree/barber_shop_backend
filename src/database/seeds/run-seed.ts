import dataSource from '@/config/typeorm.config';
import { seedModules } from './seed-modules';
import { seedActions } from './seed-actions';
import { seedPermissions } from './seed-permissions';

async function main() {
  await dataSource.initialize();

  await seedModules(dataSource);
  console.log('Seed de módulos ejecutado correctamente');

  await seedActions(dataSource);
  console.log('Seed de actions ejecutado correctamente');

  await seedPermissions(dataSource);
  console.log('Seed de permissions ejecutado correctamente');

  await dataSource.destroy();
}

main().catch((error) => {
  console.error('Error ejecutando seed:', error);
  process.exit(1);
});
