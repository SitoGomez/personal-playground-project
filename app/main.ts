import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'app/instrument.js';

import { HttpExceptionFilter } from '../src/shared/exceptions/httpExceptionFilter';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableShutdownHooks();

  await app.listen(process.env.HTTP_SERVER_PORT ?? 3000);
}

void bootstrap();
