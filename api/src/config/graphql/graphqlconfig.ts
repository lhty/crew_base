import { GqlModuleOptions } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

const GqlOptions: GqlModuleOptions = {
  autoSchemaFile: 'schema.gql',
  sortSchema: true,
  debug: false,
  playground: true,
  cors: {
    credentials: true,
    origin: process.env.CLIENTS
      ? process.env.CLIENTS.split(',')
      : ['http://localhost:8080'],
  },
  context: ({ req, res }) => ({ req, res }),
  formatError: (error: GraphQLError) => {
    const graphQLFormattedError: GraphQLFormattedError = {
      message: error.extensions.exception.response.message || error.message,
    };
    return graphQLFormattedError;
  },
};

export = GqlOptions;
