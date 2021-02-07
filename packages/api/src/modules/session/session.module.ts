import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { PrismaService } from '../prisma/prisma.service';
import { SessionController } from './session.controller';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService, PrismaService, UsersService],
})
export class SessionModule {}
