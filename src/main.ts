import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { RootModule } from './modules/root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  });

  app.useGlobalPipes(validationPipe);

  await app.listen(8081);
}
bootstrap();
