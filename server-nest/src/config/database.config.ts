import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env?.POSTGRES_HOST ?? 'localhost',
  port: parseInt(process.env?.POSTGRES_PORT ?? '5432', 10),
  username: process.env?.POSTGRES_USER ?? 'postgres',
  password: process.env?.POSTGRES_PASSWORD ?? 'postgres',
  database: process.env?.POSTGRES_DB ?? 'postgres',
  autoLoadEntities: true,
  synchronize: true,
});
