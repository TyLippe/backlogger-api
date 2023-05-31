import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('email/:email')
  findUsersByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Post()
  upsertUser(@Body() userDto: CreateUserDto) {
    return this.usersService.upsertUser(userDto);
  }
}
