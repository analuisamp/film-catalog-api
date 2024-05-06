import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Film Catalog')
    .setDescription('This is a project of a film catalog with JWT authentication, developed using TypeScript, Nest.js, TypeORM, Swagger, Docker, Redis, and PostgreSQL. The aim of this project is to provide a RESTful API for managing a movie catalog. Authenticated users can perform CRUD operations on movies.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
