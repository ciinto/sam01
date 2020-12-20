import { Module } from '@nestjs/common';
import { WsRestApiController } from './ws-rest-api.controller';
import { WsRestApiService } from './ws-rest-api.service';
import { UsersModule } from './users/users.module';
import { MysqlModule } from '@samec/databases/mysql/mysql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@samec/databases/repositories/UserRepository';

@Module({
  imports: [
    MysqlModule,
    UsersModule,
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [WsRestApiController],
  providers: [WsRestApiService],
})
export class WsRestApiModule {}
