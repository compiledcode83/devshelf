import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/createBook.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ title, authorId, linkToRead }: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        title,
        linkToRead,
        author: {
          connect: { id: authorId },
        },
      },
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

  async update(params: { where: Prisma.BookWhereUniqueInput; data: BookDto }) {
    return this.prisma.book.update(params);
  }

  async remove(where: Prisma.BookWhereUniqueInput) {
    return this.prisma.book.delete({
      where,
    });
  }
}
