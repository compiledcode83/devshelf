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
  Query,
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
import type { Prisma } from '@prisma/client';
import type { Request } from 'express';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/createBook.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { createBookSchema, updateBookSchema } from './books.schema';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';
import { AuthGuard } from '../../common/guards/auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/')
  @UseGuards(AuthGuard)
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
  async findAll(
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: keyof Prisma.BookOrderByInput,
    @Query('orderBy') orderBy?: Prisma.SortOrder,
    @Query('page') page?: string,
    @Query('isRecommended') isRecommended?: string,
  ) {
    const PER_PAGE = 1;
    const PAGE_QUERY = page ? parseInt(page) : undefined;
    return this.booksService.findAll({
      skip: PAGE_QUERY && PAGE_QUERY * PER_PAGE - PER_PAGE,
      take: PAGE_QUERY && PER_PAGE,
      where: {
        title: { contains: search },
        // isRecommended: isRecommended && isRecommended === 'true' ? true : false,
      },
      orderBy: sortBy ? { [sortBy]: orderBy || 'asc' } : undefined,
    });
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
