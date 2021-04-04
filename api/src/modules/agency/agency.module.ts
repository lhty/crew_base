import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../../cache/cache.module';
import { Agency } from '../../entities/agency.entity';
import { AgencyService } from './agency.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agency]), CacheModule],
  providers: [AgencyService],
  exports: [AgencyService],
})
export class AgencyModule {}
