/* eslint-disable @typescript-eslint/naming-convention */
import 'dotenv/config';
import * as joi from 'joi';

interface EnvConfig {
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  DATABASE_URL: string;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRATION: joi.string().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvConfig = value;

export const envs = {
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpiration: envVars.JWT_EXPIRATION,
  databaseUrl: envVars.DATABASE_URL,
};
