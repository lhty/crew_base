import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { CacheModule } from './cache/cache.module';

import { AuthModule } from './modules/auth/auth.module';
import { BaseModule } from './modules/base/base.module';
import { AgencyModule } from './modules/agency/agency.module';
import { CompanyModule } from './modules/company/company.module';
import { ContractModule } from './modules/contract/contract.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphqlModule,
    CacheModule,
    UserModule,
    AuthModule,
    BaseModule,
    AgencyModule,
    CompanyModule,
    ContractModule,
  ],
})
export class AppModule {}
