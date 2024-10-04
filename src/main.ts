import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { envs } from './config';
import { HttpExceptionFilter } from './common/http-exception.filter.filter';
async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  // middlewares
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const APP_ROUTE_PREFIX = 'api';

  app
    .enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    })
    .setGlobalPrefix(APP_ROUTE_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('The Task Management API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${APP_ROUTE_PREFIX}/:version/docs`, app, document);

  await app.listen(envs.port, () => {
    logger.debug(`Server is running on port ${envs.port}`);
  });
}
bootstrap();
