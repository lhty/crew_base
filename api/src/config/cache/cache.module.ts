import {
  Module,
  //  CacheModule as NestCacheModule
} from '@nestjs/common';
// import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    // NestCacheModule.register({
    //   store: redisStore,
    //   host: process.env.REDIS,
    //   port: 6379,
    // })
  ],
})
export class CacheModule {}
