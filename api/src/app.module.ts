import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './config/database/database.module';
import { GraphqlModule } from './config/graphql/graphql.module';
import { CacheModule } from './config/cache/cache.module';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphqlModule,
    CacheModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
