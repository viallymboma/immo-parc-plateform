import * as bodyParser from 'body-parser';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // Allow requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  });
  const PORT = 5000;
  // await app.listen(PORT);
  app.use(bodyParser.json()); // Ensure JSON parsing
  console.log(`Application is running on: http://localhost:${PORT}`);
  await app.listen(process.env.PORT ?? PORT);
}
bootstrap();
