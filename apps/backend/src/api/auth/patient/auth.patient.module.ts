import { Module } from '@nestjs/common';
import { AuthPatientController } from './auth.patient.controller';
import { AuthPatientService } from './auth.patient.service';
import { JwtModule } from '@nestjs/jwt';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { RedisToken } from '@nestjs-redis/client';
import { RedisThrottlerStorage } from '@nestjs-redis/throttler-storage';

@Module({
  imports: [
    JwtModule.register({}),
    ThrottlerModule.forRootAsync({
      inject: [RedisToken()],
      useFactory: (redis) => ({
        throttlers: [{ limit: 5, ttl: seconds(60) * 10 }],
        storage: new RedisThrottlerStorage(redis),
      }),
    }),
  ],
  controllers: [AuthPatientController],
  providers: [AuthPatientService],
})
export class AuthPatientModule {}
