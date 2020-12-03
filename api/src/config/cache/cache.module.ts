import { Module, CacheModule as NestCacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';

@Module({
  imports: [
    NestCacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 7890000, //3 month idk
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
