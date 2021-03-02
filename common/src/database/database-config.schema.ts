import * as Joi from '@hapi/joi';

export const DatabaseSchema = {
  host: Joi.string().required(),
  port: Joi.number().required(),
  database: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string()
    .allow('')
    .required(),
  ssl: Joi.object(),
} as any;
