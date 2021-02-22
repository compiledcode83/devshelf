import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByInput;
  }) {
    return this.prisma.category.findMany(params);
  }

  async findOne(categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.findUnique({
      where: categoryWhereUniqueInput,
    });
  }
}
