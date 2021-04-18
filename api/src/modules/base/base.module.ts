import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../cache/cache.module';
import { Base } from './base.entity';
import { BaseService } from './base.service';

@Module({
  imports: [TypeOrmModule.forFeature([Base]), CacheModule],
  providers: [BaseService],
  exports: [BaseService],
})
export class BaseModule {}
