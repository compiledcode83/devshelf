import { Controller, Body, Post, Req, Res } from '@nestjs/common';
import { SetCookies, Cookies } from '@nestjsplus/cookies';
import type { RequestWithCookies, CookiesType } from 'src/common/types/types';
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

  @Post('/login')
  @SetCookies()
  async login(
    @Req() req: RequestWithCookies,
    @Body() { email, password }: LoginDto,
    @Cookies() cookies: CookiesType,
  ) {
    const { token } = await this.authService.login({ email, password });
    await this.cookiesService.setTokenInCookies(req, token);
    await console.log('cookies: ', cookies);
  }

  @Post('/register')
  async register(@Body() { username, email, password }: RegisterDto) {
    return await this.authService.register({ email, password, username });
  }
}
