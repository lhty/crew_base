import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: false,
      playground: true,
      cors: {
        credentials: true,
        origin: process.env.CLIENT
          ? process.env.CLIENT.split(',')
          : ['http://localhost:8080'],
      },
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions.exception.response.message || error.message,
        };
        return graphQLFormattedError;
      },
    }),
  ],
})
export class GraphqlModule {}
