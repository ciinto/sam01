import { Injectable } from '@nestjs/common';

@Injectable()
export class WsUploadApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
