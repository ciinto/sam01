import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';
import { ProductRepository } from '@samec/databases/repositories/ProductRepository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository], MYSQL_MAIN_CONNECTION),
    MulterModule.register({
      dest: '/upload',
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
