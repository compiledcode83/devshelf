import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { getConfig } from 'src/common/utils/getConfig';
import { HttpExceptionFilter } from 'src/common/filters/httpException.filter';
import { SentryInterceptor } from './common/interceptors/sentry.interceptor';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: getConfig('SENTRY_DSN'),
  });

  app.useGlobalInterceptors(new SentryInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser(getConfig('SESSION_SECRET')));
  app.use(helmet());

  const swaggerConfig = new DocumentBuilder()
    .addCookieAuth('token')
    .setTitle('DevBooks')
    .setDescription('DevBooks API description')
    .setVersion('1.0')
    .addTag('books')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3002);
}
bootstrap();
