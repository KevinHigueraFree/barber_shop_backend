import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config(); // carga el .env
console.log('DB_HOST:', process.env.DB_HOST, 'DB_PORT:', process.env.DB_PORT);

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? '',
  database: process.env.DB_NAME ?? '',
  entities: ['src/**/infrastructure/persistence/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
