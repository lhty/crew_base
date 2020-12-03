import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as config from './graphqlconfig';
@Module({
  imports: [GraphQLModule.forRoot(config)],
})
export class GraphqlModule {}
