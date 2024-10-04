import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

function postgresLogger(): 'advanced-console' | 'simple-console' | 'file' | 'debug' | undefined {
  const loggerType = process.env.POSTGRESQL_LOGGER;
  return loggerType === 'advanced-console' || loggerType === 'simple-console' || loggerType === 'file' || loggerType === 'debug'
    ? loggerType
    : undefined;
}

export const databaseSettings: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRESQL_ADDON_HOST,
  port: Number(process.env.POSTGRESQL_ADDON_PORT),
  username: process.env.POSTGRESQL_ADDON_USER,
  password: process.env.POSTGRESQL_ADDON_PASSWORD,
  database: process.env.POSTGRESQL_ADDON_DB,
  synchronize: process.env.POSTGRESQL_SYNCHRONIZE === 'true',
  logger: postgresLogger(),
  poolSize: Number(process.env.POSTGRESQL_MAX_POOL_SIZE),
  entities: process.env.POSTGRESQL_ENTITY_PATH?.split(',') ?? ['dist/**/*.entity.js', 'dist/**/**/*.entity.js'],
  migrations: [process.env.POSTGRESQL_MIGRATION_PATH ?? 'dist/migration/*.js'],
};

export default new DataSource(databaseSettings);
