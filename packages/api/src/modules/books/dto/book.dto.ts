import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  authorId!: number;

  @ApiProperty()
  publishedDate?: Date;

  @ApiProperty()
  categoryId?: number;

  @ApiProperty()
  averageRating?: number;

  @ApiProperty()
  ratingsCount?: number;

  @ApiProperty()
  thumbnail?: string;

  @ApiProperty()
  language?: string;

  @ApiProperty()
  linkToRead!: string;

  @ApiProperty()
  isPublic!: boolean;
}
