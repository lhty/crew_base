import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: process.env.CLIENTS
      ? process.env.CLIENTS.split(',')
      : ['http://localhost:8080'],
  });

  app.use(cookieParser());

  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
