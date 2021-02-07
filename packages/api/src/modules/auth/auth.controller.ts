import { Controller, Body, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CookiesService } from 'src/modules/cookies/cookies.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookiesService: CookiesService,
  ) {}

  @Post('/sessions')
  async login(@Res({ passthrough: true }) res: Response, @Body() { email, password }: LoginDto) {
    const { token } = await this.authService.login({ email, password });
    await this.cookiesService.setTokenInCookies(res, token);
  }

  @Post('/users')
  async register(@Body() { username, email, password }: RegisterDto) {
    return await this.authService.register({ email, password, username });
  }
}
