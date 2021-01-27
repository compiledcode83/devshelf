import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { getConfig } from './utils/getConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());
  app.use(
    session({
      secret: getConfig('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DevBooks')
    .setDescription('DevBooks API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(5000);
}
bootstrap();
