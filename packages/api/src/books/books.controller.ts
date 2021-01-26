import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/createBook.dto';
import { ValidationPipe } from '../pipes/validationPipe';
import { createBookSchema } from './books.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/')
  @UsePipes(new ValidationPipe(createBookSchema))
  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  create(@Body() newBook: CreateBookDto) {
    return this.booksService.create(newBook);
  }

  @Get('/')
  @ApiOkResponse({ type: [BookDto] })
  async findAll() {
    return this.booksService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: BookDto })
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne({ id: +id });
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() bookUpdateInput: BookDto) {
    return this.booksService.update({ where: { id: +id }, data: bookUpdateInput });
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.booksService.remove({ id: +id });
  }
}
