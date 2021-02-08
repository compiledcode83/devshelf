import { ApiProperty } from '@nestjs/swagger';
import type { Book } from '@prisma/client';

export class CreateBookDto {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  authorId!: number;

  @ApiProperty()
  linkToRead!: string;
}
