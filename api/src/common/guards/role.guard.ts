import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CacheService } from '../../modules/cache/cache.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly cacheService: CacheService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
