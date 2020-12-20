import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import repositories from '../repositories'
import { UserRepository } from '../repositories/UserRepository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.MARIADB_HOST,
      port: 3306,
      username: 'samec',
      password: 'samec@110320!',
      database: 'samec',
      entities: [...repositories],
      synchronize: true,
    }),
    UserRepository
  ],
  providers: [...repositories],
  exports: [
    TypeOrmModule,
    UserRepository
  ],
})
export class MysqlModule {}
