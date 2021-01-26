import { ApiProperty } from '@nestjs/swagger';
import { Book, Prisma } from '@prisma/client';

export class CreateBookDto {
  @ApiProperty()
  title: Book['title'];

  @ApiProperty()
  authorId: Book['authorId'];

  @ApiProperty()
  linkToRead: Book['linkToRead'];
}
