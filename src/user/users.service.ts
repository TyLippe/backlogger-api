import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  upsertUser(userDto: CreateUserDto) {
    return this.userRepository.save(userDto);
  }

  findUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }
}
