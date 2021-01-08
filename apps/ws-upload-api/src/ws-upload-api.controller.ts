import { Controller, Get, Inject, Logger, Param } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from '@payk/nestjs-winston';
import { ZeebeWorker, ZEEBE_CONNECTION_PROVIDER } from '@payk/nestjs-zeebe';
import { CreateWorkflowInstanceResponse, Job, ZBClient, CompleteFn } from 'zeebe-node';
import { WsUploadApiService } from './ws-upload-api.service';
import {
  Ctx,
  Payload,
} from '@nestjs/microservices';

export interface EmailJobData {
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface Headers {
  'email:template': string;
}

@Controller()
export class WsUploadApiController {
  constructor(
    private readonly appService: WsUploadApiService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(ZEEBE_CONNECTION_PROVIDER) private readonly zbClient: ZBClient,
  ) {
    // this.zbClient.deployWorkflow('./bpmn/email.test.bpmn');
  }

  // Use the client to create a new workflow instance
  @Get(':email/:firstName/:lastName')
  getHello(@Param() param): Promise<CreateWorkflowInstanceResponse> {
    const { email, firstName, lastName } = param;
    this.logger.debug({ email, firstName, lastName });
    
    return this.zbClient.createWorkflowInstance('email.test', {
      email,
      firstName,
      lastName,
    });
  }

  // Subscribe to events of type 'email:send'
  @ZeebeWorker('email:send', {
    fetchVariable: ['email', 'firstName', 'lastName'],
  })
  async emailService(@Payload() job: Job<EmailJobData, Headers>, @Ctx() complete: CompleteFn<any>) {
    this.logger.debug('Email service');
    const template = job.customHeaders['email:template'];
    // try {
    //   await this.appService.sendEmail(template, job.variables);
    // } catch (e) {
    //   this.logger.error(e.message);
    //   return complete.failure(e.message);
    // }
    complete.success();
  }
}
