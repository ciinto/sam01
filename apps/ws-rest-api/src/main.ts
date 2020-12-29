import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as rateLimit from 'express-rate-limit';
import { WsRestApiModule } from './ws-rest-api.module';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageBody = require('../../../package.json');

  // const app = await NestFactory.create(WsRestApiModule);
  const app = await NestFactory.create<NestFastifyApplication>(
    WsRestApiModule,
    new FastifyAdapter(),
  );
  // app.use(
  //   rateLimit({
  //     windowMs: 1 * 60 * 1000, // 1 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle(packageBody.name)
    .setDescription(packageBody.description)
    .setExternalDoc('Project on Github', packageBody.repository)
    .addBearerAuth()
    .addTag('samec')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
