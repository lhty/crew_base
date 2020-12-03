import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager-redis-store';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string) {
    return await this.cache.get(key);
  }

  async getMany(keys: string[]): Promise<string[]> {
    return await this.cache.mget(keys);
  }

  async set(key: string, value: string) {
    await this.cache.set(key, value);
  }
}
