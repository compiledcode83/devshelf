import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/createBook.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { createBookSchema } from './books.schema';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';

@ApiTags('books')
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
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.booksService.findOne({ id });
  }

  @Put('/:id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() bookUpdateInput: BookDto) {
    return this.booksService.update({ where: { id }, data: bookUpdateInput });
  }

  @Delete('/:id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.booksService.remove({ id });
  }
}
