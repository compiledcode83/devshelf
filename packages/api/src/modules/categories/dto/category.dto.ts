import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from '../../books/dto/book.dto';

export class CategoryDto {
  @ApiProperty()
  title!: string;

  @ApiProperty({ type: [BookDto] })
  books!: BookDto[];
}
