/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const { phone, password } = body;
    const user = await this.authService.validateUser(phone, password);
    return this.authService.login(user);
  }
}
