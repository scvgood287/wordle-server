import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, WrapArgsType } from 'cache-manager';

@Injectable()
export class CacheDBService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getCache<T>(key: string): Promise<T | undefined> {
    const cache = await this.cacheManager.get<T>(key);
    return cache;
  }

  async setCache<T>(key: string, value: T): Promise<T> {
    return await this.cacheManager.set<T>(key, value);
  }

  async wrapCache<T>(...args: WrapArgsType<T>[]): Promise<T> {
    return await this.cacheManager.wrap(...args);
  }

  async delCache(key: string): Promise<any> {
    return await this.cacheManager.del(key);
  }

  async resetCache(): Promise<void> {
    return await this.cacheManager.reset();
  }
};