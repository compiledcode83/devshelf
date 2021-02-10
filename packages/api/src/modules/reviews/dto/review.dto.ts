import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty()
  content!: string;

  @ApiProperty()
  rating!: number;

  @ApiProperty()
  bookId!: number;

  @ApiProperty()
  authorId!: number;
}
