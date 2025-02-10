import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../../users/users.module';
import { PrismaService } from '../database/prisma.service';
import { AuthModule } from '../authorization/auth.module';
import { HealthController } from '../health/health.controller';
import { HealthModule } from '../health/health.module';
import { PrismaModule } from '../database/prisma.module';
import { LOGGER_CONFIG } from '../logger';
import { ENV_CONFIG } from '../env';
import { CACHE_CONFIG } from '../cache';
import { RATE_LIMIT_CONFIG } from '../rate-limit';

@Module({
  imports: [
    ConfigModule.forRoot(ENV_CONFIG),
    PrometheusModule.register(),
    LoggerModule.forRoot(LOGGER_CONFIG),
    CacheModule.register(CACHE_CONFIG),
    ThrottlerModule.forRoot(RATE_LIMIT_CONFIG),
    UsersModule,
    AuthModule,
    HealthModule,
    PrismaModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
