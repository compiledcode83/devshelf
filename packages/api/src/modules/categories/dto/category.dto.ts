import { ApiProperty } from '@nestjs/swagger';
import type { Book } from '@prisma/client';
import { BookDto } from 'src/modules/books/dto/book.dto';

export class CategoryDto {
  @ApiProperty()
  title!: string;

  @ApiProperty({ type: [BookDto] })
  books!: BookDto[];
}
