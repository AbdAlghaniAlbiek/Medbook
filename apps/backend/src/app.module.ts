import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe, ZodSerializerInterceptor } from 'nestjs-zod';
import { HttpExceptionFilter } from './helpers/errors/exceptionFilter.error';
import { PrismaModule } from './services/prisma/prisma.module';
import { CustomConfigModule } from './services/config/config.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RedisModule } from '@nestjs-redis/client';
import { IRedisConfig } from './helpers/configs/config.interfaces';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  bcryptConfig,
  jwtConfig,
  nodeConfig,
  redisConfig,
  resendConfig,
  throttlerConfig,
} from './helpers/configs/config.env';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DoctorsModule } from './api/modules/doctors.module';
import { PatientsModule } from './api/modules/patients.module';

@Module({
  imports: [
    DoctorsModule,
    PatientsModule,

    PrismaModule,
    CustomConfigModule,

    EventEmitterModule.forRoot({ global: true }),

    RedisModule.forRootAsync({
      isGlobal: true,
      useFactory: (redisConfig: ConfigService<IRedisConfig>) => ({
        options: {
          url: redisConfig.get('REDIS_URL'),
        },
      }),
      inject: [ConfigService],
    }),

    ConfigModule.forRoot({
      expandVariables: true,
      cache: true,
      isGlobal: true,
      load: [
        bcryptConfig,
        nodeConfig,
        // dbConfig,
        jwtConfig,
        throttlerConfig,
        redisConfig,
        resendConfig,
      ],
    }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(process.cwd(), 'upload'),
    // }),
  ],
})
export class AppModule {}
