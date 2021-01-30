import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [],
  providers: [SessionService, PrismaService],
})
export class SessionModule {}
