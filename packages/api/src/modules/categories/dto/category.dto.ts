import { ApiProperty } from '@nestjs/swagger';
import { Book } from '@prisma/client';

export class CategoryDto {
  @ApiProperty()
  title!: Book['title'];

  @ApiProperty()
  books!: Book[];
}
