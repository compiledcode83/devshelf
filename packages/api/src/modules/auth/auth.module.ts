import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SessionService } from '../session/session.service';
import { CookiesService } from '../cookies/cookies.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, SessionService, CookiesService],
})
export class AuthModule {}
