import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  findUsersById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  upsertUser(@Body() userDto: CreateUserDto) {
    return this.usersService.upsertUser(userDto);
  }
}
