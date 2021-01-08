import { Module } from '@nestjs/common';
import { WinstonModule } from '@payk/nestjs-winston';
import { ZeebeModule, ZeebeServer } from '@payk/nestjs-zeebe';
import { WsUploadApiController } from './ws-upload-api.controller';
import { WsUploadApiService } from './ws-upload-api.service';
import * as winston from 'winston';

@Module({
  imports: [
    ZeebeModule.forRoot({
      gatewayAddress: process.env.ZEEBE_HOST,
      options: {
        debug: true
      }
    }),
    WinstonModule.forRoot({
      transports: [new winston.transports.Console()],
    }),
    WsUploadApiService
  ],
  controllers: [WsUploadApiController],
  providers: [
    ZeebeServer,
    WsUploadApiService],
})
export class WsUploadApiModule { }
