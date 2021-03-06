import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSecurity } from './config/security';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SECURITY
  setupSecurity(app);

  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
