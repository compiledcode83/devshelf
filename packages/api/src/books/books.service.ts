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

  async findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: any) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
