import { Module, RequestMethod } from '@nestjs/common';
import { StatusModule } from './modules/status/status.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PrettyOptions } from 'pino-pretty';
import { MapsModule } from './modules/maps/maps.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      ttl: +process.env.TTL_CACHE_IN_MS,
      max: 3,
      isGlobal: true,
      store: redisStore as unknown as CacheStore,
      socket: {
        port: 6379,
        host: 'redis',
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.get('LOG_LEVEL', 'info'),
          redact: ['request.headers.authorization'],
          transport: {
            target: 'pino-pretty',
            options: {
              ignore: 'req.headers,pid,hostname,context,responseTime',
              colorize: true,
              singleLine: true,
              levelFirst: true,
              sync: true,
              translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss.l'Z'",
            } as PrettyOptions,
          },
        },
        exclude: [{ method: RequestMethod.ALL, path: 'status' }],
      }),
      inject: [ConfigService],
    }),
    StatusModule,
    MapsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
