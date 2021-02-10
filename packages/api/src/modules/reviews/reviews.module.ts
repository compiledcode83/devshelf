import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SessionService } from '../session/session.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, UsersService, SessionService],
})
export class ReviewsModule {}
