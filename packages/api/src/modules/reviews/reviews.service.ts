import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

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
}
