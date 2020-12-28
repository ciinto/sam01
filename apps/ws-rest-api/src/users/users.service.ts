import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';
import { User } from '@samec/databases/entities/User';
import {
  ERROR__USER__USER_EMAIL_ALREADY_EXIST,
  ERROR__USER__USER_NAME_ALREADY_EXIST,
} from '@samec/databases/constants/error.constants';
import { UserRepository } from '@samec/databases/repositories/UserRepository';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User, MYSQL_MAIN_CONNECTION)
  private readonly usersRepository: UserRepository;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { userName, email } = createUserDto;
    try {
      if (await this.usersRepository.findOne({ userName }))
        throw new BadRequestException(ERROR__USER__USER_NAME_ALREADY_EXIST);
      if (await this.usersRepository.findOne({ email }))
        throw new BadRequestException(ERROR__USER__USER_EMAIL_ALREADY_EXIST);

      return await this.usersRepository.save(
        this.usersRepository.create(createUserDto),
      );
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }

  async getAllUsers(options: IPaginationOptions): Promise<User[]> {
    // return await paginate<User>(this.usersRepository, options);

    return await this.usersRepository.find({ cache: 60000 });
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
