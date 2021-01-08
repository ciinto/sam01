import { Test, TestingModule } from '@nestjs/testing';
import { WsUploadApiController } from './ws-upload-api.controller';
import { WsUploadApiService } from './ws-upload-api.service';

describe('WsUploadApiController', () => {
  let wsUploadApiController: WsUploadApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WsUploadApiController],
      providers: [WsUploadApiService],
    }).compile();

    wsUploadApiController = app.get<WsUploadApiController>(WsUploadApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wsUploadApiController.getHello()).toBe('Hello World!');
    });
  });
});
