import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';
import { Product } from '@samec/databases/entities/Product';
import { ProductRepository } from '@samec/databases/repositories/ProductRepository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  @InjectRepository(Product, MYSQL_MAIN_CONNECTION)
  private readonly productRepository: ProductRepository;

  create(createProductDto: CreateProductDto) {
    const prodCreateObj = this.productRepository.create(createProductDto)

    return this.productRepository.save(prodCreateObj);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
