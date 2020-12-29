import { Module } from '@nestjs/common';
import { WsRestApiController } from './ws-rest-api.controller';
import { WsRestApiService } from './ws-rest-api.service';
import { UsersModule } from './users/users.module';
import { MysqlModule } from '@samec/databases/mysql/mysql.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MysqlModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [WsRestApiController],
  providers: [WsRestApiService],
})
export class WsRestApiModule {}
