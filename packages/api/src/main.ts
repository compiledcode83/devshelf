import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('DevBooks')
  //   .setDescription('DevBooks API description')
  //   .setVersion('1.0')
  //   .addTag('books')
  //   .build();
  // const document = SwaggerModule.createDocument(app, swaggerConfig);
  // SwaggerModule.setup('swagger', app, document);

  await app.listen(5000);
}
bootstrap();
