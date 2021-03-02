import { Injectable, Logger } from '@nestjs/common';

import * as Joi from '@hapi/joi';

import { readFile } from '../utils';
import { IDatabaseConfig, ISSLConfig } from './database.contracts';
import { DatabaseSchema } from './database-config.schema';

Injectable();
export class DatabaseConfig implements IDatabaseConfig {
  private logger: Logger = new Logger(DatabaseConfig.name);
  constructor(
    public host: string = process.env.APP_POSTGRES_HOST,
    public port: number = parseInt(process.env.APP_POSTGRES_PORT, 10) || 5432,
    public database: string = process.env.APP_POSTGRES_DB,
    public user: string = process.env.APP_POSTGRES_USER,
    public password: string = process.env.APP_POSTGRES_PASSWORD || '',
    public ssl?: ISSLConfig,
  ) {
    const ca = readFile(process.env.APP_POSTGRES_SSL_CA || '');
    if (ca) {
      this.ssl = { ca };
    }
  }

  print() {
    this.logger.log(`HOST: ${this.host}`);
    this.logger.log(`PORT: ${this.port}`);
    this.logger.log(`DATABASE: ${this.database}`);
    this.logger.log(`USER: ${this.user}`);
  }

  isValid() {
    const schema = Joi.object(DatabaseSchema);
    const { error } = schema.validate(this, { stripUnknown: true });
    if (error) {
      this.logger.error(`Joi validation error: ${JSON.stringify(error.details)}`);
    } else {
      this.logger.debug(`Joi validation success`);
    }
    return !error;
  }
}
