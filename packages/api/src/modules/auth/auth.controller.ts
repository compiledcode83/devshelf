import { Controller, Body, Post, Req, Res } from '@nestjs/common';
import { SetCookies, SignedCookies } from '@nestjsplus/cookies';
import { RequestWithCookies } from 'src/common/types/types';
import { CookiesService } from 'src/modules/cookies/cookies.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Cookies } from '@nestjsplus/cookies/index';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookiesService: CookiesService,
  ) {}

  @Post('/login')
  async login(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Body() { email, password }: LoginDto,
    @Cookies() cookies: any,
    @SignedCookies() signed: any,
  ) {
    const { token } = await this.authService.login({ email, password });
    await this.cookiesService.setTokenInCookies(res, token);
    await console.log('cookies: ', cookies);
    await console.log('signed cookies: ', cookies);
    await console.log('Got cookies:', req.cookies);
    await console.log('Got cookies:', req._cookies);
    await console.log('cookie', req.signedCookies);
  }

  @Post('/register')
  async register(@Body() { username, email, password }: RegisterDto) {
    return await this.authService.register({ email, password, username });
  }
}
