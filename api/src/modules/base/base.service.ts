import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../../cache/cache.service';
import { Base } from '../../entities/base.entity';

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(Base)
    private readonly baseRepository: Repository<Base>,
    private readonly cacheService: CacheService,
  ) {}
}
