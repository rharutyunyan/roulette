import * as fs from 'fs';

import { Entities } from '@roulette/common/src/models';

// Check typeORM documentation for more information.
export const config = {
  type: 'postgres',
  host: process.env.APP_POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.APP_POSTGRES_PORT, 10) || 5432,
  username: process.env.APP_POSTGRES_USER || 'postgres',
  password: process.env.APP_POSTGRES_PASSWORD,
  database: process.env.APP_POSTGRES_DB || 'roulette',
  entities: Entities,

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,

  logging: true,
  logger: 'advanced-console',
  migrationsTableName: 'db_migrations',
  migrations: [__dirname + '/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

try {
  const caPath = process.env.APP_POSTGRES_SSL_CA;
  if (fs.existsSync(caPath)) {
    const ca = fs.readFileSync(caPath);
    /* tslint:disable:no-string-literal */
    config['ssl'] = { ca: ca.toString() };
  } else {
    /* tslint:disable:no-console */
    console.warn(`SSL is off. reason: ${caPath} file not exists`);
  }
} catch (e) {
  /* tslint:disable:no-console */
  console.warn('SSL is off. reason:', e);
}

module.exports = config;
