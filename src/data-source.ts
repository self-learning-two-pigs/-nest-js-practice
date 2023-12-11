import { DataSource, DataSourceOptions } from 'typeorm';

export const database: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nest',
  synchronize: true,
  logging: true,
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/_migration/**/*.ts'],
  subscribers: ['src/_migration/**/*.ts'],
  migrationsTableName: 'version_history',
};

export const AppDataSource = new DataSource(database);
