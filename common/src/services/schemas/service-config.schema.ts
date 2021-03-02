import * as Joi from '@hapi/joi';

export const ServiceSchema = {
  environment: Joi.string().required(),
  isMicroservice: Joi.boolean().required(),
  // port: Joi.number(),
  swagger: Joi.object().keys({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    Version: Joi.string().required(),
    Path: Joi.string().required(),
  }),
  rabbitmq: Joi.object().keys({
    User: Joi.string().required(),
    Password: Joi.string().required(),
    Host: Joi.string().required(),
    QueueName: Joi.string().required(),
  }),
  globalPrefix: Joi.string().required(),
} as any;
