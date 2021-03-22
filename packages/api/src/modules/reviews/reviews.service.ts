import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Review, Session } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';
import type { Request } from 'express';
import { UsersService } from '../users/users.service';
import { SessionService } from '../session/session.service';
import { UpdateReviewDto } from './dto/updateReview.dto';
import { Nil } from '@devshelf/types';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly sessionService: SessionService,
  ) {}

  async create({ content, rating, authorId, bookId }: ReviewDto) {
    return this.prisma.review.create({
      data: {
        content,
        rating,
        author: {
          connect: { id: authorId },
        },
        book: {
          connect: { id: bookId },
        },
      },
    });
  }

  async findOne(reviewWhereUniqueInput: Prisma.ReviewWhereUniqueInput) {
    return this.prisma.review.findUnique({ where: reviewWhereUniqueInput });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReviewWhereUniqueInput;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByInput;
  }) {
    return this.prisma.review.findMany(params);
  }

  private isUserOwnership(review: Nil<Review>, session: Nil<Session>) {
    if (!review || !session) {
      return false;
    }

    return review && review.authorId !== session.userId;
  }

  async update({ req, id, data }: { req: Request; id: number; data: UpdateReviewDto }) {
    const token = req.cookies.token as string;
    const session = await this.sessionService.findOne(token);
    const review = await this.findOne({ id });

    if (!session || this.isUserOwnership(review, session)) {
      throw new ForbiddenException();
    }

    return this.prisma.review.update({
      where: { id },
      data,
    });
  }

  async remove(req: Request, id: number) {
    const token = req.cookies.token as string;
    const session = await this.sessionService.findOne(token);
    const review = await this.findOne({ id });

    if (!session || this.isUserOwnership(review, session)) {
      throw new ForbiddenException();
    }

    return this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
