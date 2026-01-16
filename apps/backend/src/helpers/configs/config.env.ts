// import { resolve } from 'path';

// import envFilePath from './config.helper';
import { resolve } from 'path';
import {
  IBcryptConfig,
  // IDatabaseConfig,
  IJwtConfig,
  INodeConfig,
  IRedisConfig,
  IResendConfig,
  IThrottlerConfig,
} from './config.interfaces';
import { config } from 'dotenv';

// envFilePath(resolve(process.cwd(), '.env'));

config({ path: resolve(__dirname, '../../../.env') });

export function nodeConfig(): INodeConfig {
  return {
    APP_ENV: process.env.APP_ENV as string,
    APP_PORT: parseInt(<string>process.env.APP_PORT, 10),
    DEV_FRONTEND_URL: process.env.DEV_FRONTEND_URL as string,
    PROD_FRONTEND_URL: process.env.PROD_FRONTEND_URL as string,
    UPLOAD_PATH: process.env.UPLOAD_PATH as string,
  };
}

export function bcryptConfig(): IBcryptConfig {
  return {
    SALT: parseInt(<string>process.env.HASH_SALT, 10),
  };
}

// export function dbConfig(): IDatabaseConfig {
//   return {
//     DB_HOST: process.env.DB_HOST as string,
//     DB_USER: process.env.DB_USER as string,
//     DB_PASSWORD: process.env.DB_PASSWORD as string,
//     DB_PORT: parseInt(<string>process.env.DB_PORT, 10),
//     DB_NAME: process.env.DB_NAME as string,
//     DATABASE_URL: process.env.DATABASE_URL as string,
//   };
// }

export function jwtConfig(): IJwtConfig {
  return {
    JWT_SECRET_KEY_PUBLIC: process.env.JWT_SECRET_KEY_PUBLIC as string,
    JWT_SECRET_KEY_PRIVATE: process.env.JWT_SECRET_KEY_PRIVATE as string,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM as string,
    JWT_EXPIRES_IN_PUBLIC: process.env.JWT_EXPIRES_IN_PUBLIC as string,
    JWT_EXPIRES_IN_PRIVATE: process.env.JWT_EXPIRES_IN_PRIVATE as string,
  };
}

export function throttlerConfig(): IThrottlerConfig {
  return {
    THROTTLER_TTL: Number.parseInt(<string>process.env.THROTTLER_TTL, 10),
    THROTTLER_LIMIT: Number.parseInt(<string>process.env.THROTTLER_LIMIT, 10),
    THROTTLER_BLOCK_DURATION: Number.parseInt(
      <string>process.env.THROTTLER_BLOCK_DURATION,
      10,
    ),
  };
}

export function redisConfig(): IRedisConfig {
  return {
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: Number.parseInt(<string>process.env.REDIS_PORT),
    REDIS_URL: process.env.REDIS_URL as string,
  };
}

export function resendConfig(): IResendConfig {
  return {
    RESEND_API_KEY: <string>process.env.RESEND_API_KEY,
    RESEND_FROM: <string>process.env.RESEND_FROM,
  };
}
