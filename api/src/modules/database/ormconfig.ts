import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/models/*.entity{.ts,.js}'],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // synchronize: process.env.NODE_ENV !== 'production',
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  dropSchema: false,
  // logging: ['warn', 'error'],
  // logger: process.env.NODE_ENV === 'production' ? 'file' : 'debug',
  // console.log driven development
  logging: true,
  logger: process.env.NODE_ENV === 'production' ? 'file' : 'advanced-console',
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + 'src/migrations/',
  },
};

export default config;
