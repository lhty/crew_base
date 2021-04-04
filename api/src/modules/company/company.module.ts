import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../../cache/cache.module';
import { Company } from '../../entities/company.entity';
import { CompanyService } from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), CacheModule],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
