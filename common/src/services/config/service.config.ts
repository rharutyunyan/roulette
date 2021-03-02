import { Injectable, Logger } from '@nestjs/common';

import * as Joi from '@hapi/joi';

import { IServiceConfig } from './config.contract';
import { Environment } from '../../types';
import { ServiceSchema } from '../schemas';

@Injectable()
export class ServiceConfig implements IServiceConfig {
  private logger: Logger = new Logger(ServiceConfig.name);

  public environment = process.env.APP_ENVIRONMENT || Environment.Development;
  public rootUrl = process.env.APP_ROOT_URL;
  public isMicroservice: boolean = Boolean(process.env.APP_IS_MICROSERVICE) || true;
  public port: number = parseInt(process.env.APP_PORT, 10);
  public swagger = {
    Name: process.env.APP_SWAGGER_NAME || 'Swagger',
    Description: process.env.APP_SWAGGER_DESCRIPTION || 'microservice',
    Version: process.env.APP_SWAGGER_VERSION || 'v1',
    Path: process.env.APP_SWAGGER_PATH = '/api',
  };
  public globalPrefix: string = process.env.APP_GLOBAL_PREFIX || '/api';
  public rabbitmq = {
    User: process.env.APP_RABBITMQ_USER || 'admin',
    Password: process.env.APP_RABBITMQ_PASSWORD || 'admin',
    Host: process.env.APP_RABBITMQ_HOST || 'localhost:5672',
    QueueName: process.env.APP_RABBITMQ_QUEUE_NAME || 'random-number-generator',
  };

  print() {
    this.logger.log(`APP_ENVIRONMENT: ${this.environment}`);
    this.logger.log(`APP_IS_MICROSERVICE: ${JSON.stringify(this.isMicroservice)}`);
    this.logger.log(`APP_PORT: ${JSON.stringify(this.port)}`);
    this.logger.log(`SWAGGER: ${JSON.stringify(this.swagger)}`);
    this.logger.log(`APP_GLOBAL_PREFIX: ${JSON.stringify(this.globalPrefix)}`);
    this.logger.log(`RABBITMQ: ${JSON.stringify(this.rabbitmq)}`);
  }

  isValid() {
    const schema = Joi.object(ServiceSchema);
    const { error } = schema.validate(this, { stripUnknown: true });
    if (error) {
      this.logger.error(`Joi validation error: ${JSON.stringify(error.details)}`);
    } else {
      this.logger.debug(`Joi validation success`);
    }
    return !error;
  }
}
