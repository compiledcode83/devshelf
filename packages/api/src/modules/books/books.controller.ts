import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
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
import { createBookSchema } from './books.schema';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';
import { RequestWithCookies } from 'src/common/types/types';
import { Cookies, SignedCookies, CookieSettings } from '@nestjsplus/cookies/index';
import { SessionService } from '../session/session.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('/')
  @UsePipes(new ValidationPipe(createBookSchema))
  @ApiBody({ type: CreateBookDto })
  @ApiOperation({ summary: 'Create new book' })
  @ApiCreatedResponse({ description: 'The book has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() newBook: CreateBookDto) {
    return this.booksService.create(newBook);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ type: [BookDto] })
  @ApiNotFoundResponse({ description: 'There is no book with this id' })
  async findAll(@Req() req: any, @Cookies() cookies: CookieSettings | CookieSettings[]) {
    console.log('books cookies', cookies);
    console.log('req.cookies', req.cookies);
    return this.booksService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get book' })
  @ApiOkResponse({ type: BookDto })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.booksService.findOne({ id });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(@Param('id', new ParseIntPipe()) id: number, @Body() bookUpdateInput: BookDto) {
    return this.booksService.update({ where: { id }, data: bookUpdateInput });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.booksService.remove({ id });
  }
}
