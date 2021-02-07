import { Controller, Get, Req } from '@nestjs/common';
import { Cookies } from '@nestjsplus/cookies';
import { SessionService } from './session.service';
import { CookiesType } from 'src/common/types/types';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UsersService,
  ) {}

  @Get('/me')
  async findOne(@Cookies() cookies: CookiesType) {
    const token = await this.sessionService.findOne(cookies.token);
    const { id, username, email } = (await this.userService.findUserBy<'id'>({
      by: 'id',
      value: token!.userId,
    })) as User;

    return { id, username, email };
  }
}
