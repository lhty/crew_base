import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
import { AgencyModule } from './agency/agency.module';
import { CompanyModule } from './company/company.module';
import { ContractModule } from './contract/contract.module';
import { UserModule } from './user/user.module';

import { CacheModule } from './cache/cache.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import * as orm_config from '../config/ormconfig';
import * as graphql_config from '../config/graphqlconfig';

export const Modules = [
  TypeOrmModule.forRoot(orm_config),
  GraphQLModule.forRoot(graphql_config),
  CacheModule,
  AuthModule,
  BaseModule,
  AgencyModule,
  CompanyModule,
  ContractModule,
  UserModule,
];
