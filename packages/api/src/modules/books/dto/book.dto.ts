import { ApiProperty } from '@nestjs/swagger';
import type { Book } from '@prisma/client';

export class BookDto {
  @ApiProperty()
  title!: Book['title'];

  @ApiProperty()
  description?: Book['description'];

  @ApiProperty()
  authorId!: Book['authorId'];

  @ApiProperty()
  publishedDate?: Book['publishedDate'];

  @ApiProperty()
  categoryId?: Book['categoryId'];

  @ApiProperty()
  averageRating?: Book['averageRating'];

  @ApiProperty()
  ratingsCount?: Book['ratingsCount'];

  @ApiProperty()
  thumbnail?: Book['thumbnail'];

  @ApiProperty()
  language?: Book['language'];

  @ApiProperty()
  linkToRead!: Book['linkToRead'];

  @ApiProperty()
  isPublic!: Book['isPublic'];
}
