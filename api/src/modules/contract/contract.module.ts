import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../cache/cache.module';
import { Contract } from './contract.entity';
import { ContractService } from './contract.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contract]), CacheModule],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
