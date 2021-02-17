import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/createBook.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { createBookSchema, updateBookSchema } from './books.schema';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import type { Request } from 'express';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe(createBookSchema))
  @ApiBody({ type: CreateBookDto })
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Create new book' })
  @ApiCreatedResponse({ description: 'The book has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() newBook: CreateBookDto) {
    return this.booksService.create(newBook);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ type: [BookDto] })
  async findAll(@Req() req: Request) {
    console.log(req.cookies);
    return this.booksService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get book' })
  @ApiOkResponse({ type: BookDto })
  @ApiNotFoundResponse({ description: 'There is no book with this id' })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.booksService.findOne({ id });
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe(updateBookSchema))
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Update a book' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(@Param('id', new ParseIntPipe()) id: number, @Body() bookUpdateInput: BookDto) {
    return this.booksService.update({ where: { id }, data: bookUpdateInput });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe(updateBookSchema))
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Delete a book' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.booksService.remove({ id });
  }
}
