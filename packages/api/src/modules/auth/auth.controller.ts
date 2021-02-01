import { Controller, Body, Post, Req } from '@nestjs/common';
import { SetCookies } from '@nestjsplus/cookies';
import { RequestWithCookies } from 'src/common/types/types';
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
  async login(@Req() req: RequestWithCookies, @Body() { email, password }: LoginDto) {
    const { token } = await this.authService.login({ email, password });
    return await this.cookiesService.setTokenInCookies(req, token);
  }

  @Post('/register')
  async register(@Body() { username, email, password }: RegisterDto) {
    return await this.authService.register({ email, password, username });
  }
}
