export interface INodeConfig {
  APP_ENV: string;
  APP_PORT: number;
  DEV_FRONTEND_URL: string;
  PROD_FRONTEND_URL: string;
  UPLOAD_PATH: string;
}

export interface IBcryptConfig {
  SALT: number;
}

// export interface IDatabaseConfig {
//   DB_HOST: string;
//   DB_USER: string;
//   DB_PASSWORD: string;
//   DB_PORT: number;
//   DB_NAME: string;
//   DATABASE_URL: string;
// }

export interface IJwtConfig {
  JWT_SECRET_KEY_PUBLIC: string;
  JWT_SECRET_KEY_PRIVATE: string;
  JWT_ALGORITHM: string;
  JWT_EXPIRES_IN_PUBLIC: string;
  JWT_EXPIRES_IN_PRIVATE: string;
}

export interface IThrottlerConfig {
  THROTTLER_TTL: number;
  THROTTLER_LIMIT: number;
  THROTTLER_BLOCK_DURATION: number;
}

export interface IResendConfig {
  RESEND_FROM: string;
  RESEND_API_KEY: string;
}

export interface IRedisConfig {
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_URL: string;
}
