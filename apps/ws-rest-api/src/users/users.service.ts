import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';
import { User } from '@samec/databases/entities/User';
import { UserRepository } from '@samec/databases/repositories/UserRepository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User, MYSQL_MAIN_CONNECTION)
  private readonly usersRepository: UserRepository;

  test(userName: string) {
    return this.usersRepository.findByUserName(userName);
  }

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.insert(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOne(id);
  }

  remove(id: number) {
    return this.usersRepository.softDelete(id);
  }
}
