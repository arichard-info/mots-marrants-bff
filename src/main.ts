import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mots Marrants')
    .setDescription('Mots Marrants API Description')
    .setVersion('1.0')
    .addTag('mots-marrants')
    .addCookieAuth(
      'access_token',
      {
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
      },
      'access_token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser(process.env.COOKIE_SECRET));
  await app.listen(3000);
}
bootstrap();
