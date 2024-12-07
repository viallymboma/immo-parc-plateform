import { Response } from 'express'; // Import from express

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { phone: string; password: string }, @Res() res: Response) {
    const { phone, password } = body;
    const userToken = await this.authService.validateUser(phone, password);
    // Set the cookie with the token
    res.cookie('jwt', userToken, {
      httpOnly: true, // Ensures the cookie is accessible only by the web server
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // Set expiration for the cookie (1 day in ms)
      sameSite: 'strict', // Restrict cookie usage to same site
    });
    return this.authService.login(userToken);
  }
}
