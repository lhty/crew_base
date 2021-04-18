import { GqlModuleOptions } from '@nestjs/graphql';

const GqlOptions: GqlModuleOptions = {
  autoSchemaFile: 'schema.gql',
  sortSchema: true,
  debug: false,
  playground: true,
  cors: {
    credentials: true,
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : ['http://localhost:8080'],
  },
  context: ({ req, res }) => ({ req, res }),
  formatError: (error) => {
    console.log(error);
    return {
      message: error.extensions.exception.response.message || error.message,
      statusCode: error.extensions.exception.status,
    };
  },
};

export = GqlOptions;
