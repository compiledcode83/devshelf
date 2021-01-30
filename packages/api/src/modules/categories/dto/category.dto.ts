import { ApiProperty } from '@nestjs/swagger';
import type { Book } from '@prisma/client';

export class CategoryDto {
  @ApiProperty()
  title!: Book['title'];

  @ApiProperty()
  books!: Book[];
}
