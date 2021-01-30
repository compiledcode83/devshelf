import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService],
})
export class AuthModule {}
