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
  const actionRepo = dataSource.getRepository(TypeOrmActionEntity);

  const existingActions = await actionRepo.find({
    where: actionCatalog.map(({ name }) => ({ name })),
    select: ['id', 'name'],
  });

  const existingNames = new Set(existingActions.map((action) => action.name));
  const toCreate = actionCatalog.filter(({ name }) => !existingNames.has(name));

  if (toCreate.length > 0) {
    await actionRepo.insert(toCreate);
  }
}
