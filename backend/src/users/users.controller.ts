/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { UsersService } from './users.service';

// import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() body: { email: string; password: string; parentId?: string }) {
    return this.usersService.createUser(body.email, body.password, body.parentId);
  }

  // createUser(@Body() body: CreateUserDto) {
  //   return this.usersService.createUser(body.email, body.password, body.parentId);
  // }

  @Post(':id/status')
  updateStatus(@Param('id') userId: string, @Body() body: { status: 'internship' | 'regular' }) {
    return this.usersService.updateStatus(userId, body.status);
  } 
} 
