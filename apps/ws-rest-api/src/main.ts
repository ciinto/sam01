import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as rateLimit from 'express-rate-limit';
import { WsRestApiModule } from './ws-rest-api.module';

async function bootstrap() {
  const app = await NestFactory.create(WsRestApiModule);

  // app.use(
  //   rateLimit({
  //     windowMs: 1 * 60 * 1000, // 1 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('SamEC API docs')
    .setDescription('SamEC API docs')
    .setVersion('1.0')
    .addTag('samec')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
