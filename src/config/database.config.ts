import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/infraestructure/persistence/*.entity{.ts,.js}'],
  synchronize: false, // NUNCA true en un proyecto real
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
}));
