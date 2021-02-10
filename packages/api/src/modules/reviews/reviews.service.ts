import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

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
