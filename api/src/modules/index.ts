import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
import { AgencyModule } from './agency/agency.module';
import { CompanyModule } from './company/company.module';
import { ContractModule } from './contract/contract.module';
import { UserModule } from './user/user.module';

import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { CacheModule } from './cache/cache.module';

export const Modules = [
  DatabaseModule,
  GraphqlModule,
  CacheModule,
  AuthModule,
  BaseModule,
  AgencyModule,
  CompanyModule,
  ContractModule,
  UserModule,
];
