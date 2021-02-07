import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SessionService } from '../session/session.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService, SessionService],
})
export class BooksModule {}
