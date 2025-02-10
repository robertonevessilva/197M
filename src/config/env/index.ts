import * as Joi from 'joi';

export const ENV_CONFIG = {
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    PORT: Joi.number().port().default(3001),
    DATABASE_URL: Joi.string().default(
      'postgresql://postgres:123@localhost:5432/197mulher_db_dev?schema=public',
    ),
    X_API_KEY: Joi.string().default('x-api-key-secret'),
  }),
};
