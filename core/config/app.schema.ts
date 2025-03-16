import * as Joi from 'joi';

export default Joi.object({
  // DATABASE
  MYSQL_CLIENT: Joi.required(),
  MYSQL_DB_HOST: Joi.required(),
  MYSQL_DB_PORT: Joi.required(),
  MYSQL_DB_USER: Joi.required(),
  MYSQL_DB_PASSWORD: Joi.required(),
  MYSQL_DB_NAME: Joi.required(),

  // AUTH
  JWT_AT_SECRET_KEY: Joi.required(),
  JWT_EXPIRATION_TIME: Joi.required(),
});
