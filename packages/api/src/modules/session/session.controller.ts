import { Controller, Get, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import type { Request } from 'express';
import { SessionService } from './session.service';
import { UsersService } from '../users/users.service';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UsersService,
  ) {}

  @Get('/me')
  async findOne(@Req() req: Request) {
    const token = await this.sessionService.findOne(req.cookies.token);
    const { id, username, email, role } = (await this.userService.findBy<'id'>({
      by: 'id',
      value: token!.userId,
    })) as User;

    return { id, username, email, role };
  }
}
