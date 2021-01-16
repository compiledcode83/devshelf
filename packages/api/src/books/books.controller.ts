import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/')
  create(@Body() newBook: Prisma.BookCreateInput) {
    return this.booksService.create(newBook);
  }

  @Get('/')
  async findAll() {
    return this.booksService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne({ id: +id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: any) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
