import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BookCreateInput) {
    return this.prisma.book.create({
      data,
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByInput;
  }) {
    return this.prisma.book.findMany(params);
  }

  async findOne(bookWhereUniqueInput: Prisma.BookWhereUniqueInput) {
    return this.prisma.book.findUnique({
      where: bookWhereUniqueInput,
    });
  }

  async update(params: { where: Prisma.BookWhereUniqueInput; data: Prisma.BookUpdateInput }) {
    return this.prisma.book.update(params);
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
