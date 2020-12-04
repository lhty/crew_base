export default {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/entities/*.entity{.ts,.js}'],
  // We are using migrations, synchronize should be set to false.
  synchronize: process.env.NODE_ENV !== 'production',
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === 'production' ? 'file' : 'debug',
  migrations: [__dirname + '/dist/config/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/config/database/migrations',
  },
};
