import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from '@payk/nestjs-winston';
import { WsUploadApiModule } from './ws-upload-api.module';
import { ZeebeServer } from '@payk/nestjs-zeebe';

async function bootstrap() {
  const app = await NestFactory.create(WsUploadApiModule);

  const microservice = app.connectMicroservice({
    strategy: app.get(ZeebeServer),
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();