import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WsRestApiModule } from './ws-rest-api.module';

async function bootstrap() {
  const app = await NestFactory.create(WsRestApiModule);

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
