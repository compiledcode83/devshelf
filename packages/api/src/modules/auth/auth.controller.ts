import { Controller, Body, Post, Req, Res } from '@nestjs/common';
import { SetCookies, Cookies } from '@nestjsplus/cookies';
import type { RequestWithCookies, CookiesType } from 'src/common/types/types';
import { CookiesService } from 'src/modules/cookies/cookies.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SessionService } from '../session/session.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookiesService: CookiesService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('/sessions')
  @SetCookies()
  async login(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Body() { email, password }: LoginDto,
    @Cookies() cookies: CookiesType,
  ) {
    const { token } = await this.authService.login({ email, password });
    await this.cookiesService.setTokenInCookies(req, token);
    res.cookie('token', token);
    console.log('cookies: ', cookies);
    console.log('req.cookies', req.cookies);
    const isSessionValid = await this.sessionService.isSessionValid(token);
    console.log('isSessionValid', isSessionValid);
  }

  @Post('/users')
  async register(@Body() { username, email, password }: RegisterDto) {
    return await this.authService.register({ email, password, username });
  }
}
