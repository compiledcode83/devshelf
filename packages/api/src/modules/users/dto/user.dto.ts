import { ApiProperty } from '@nestjs/swagger';
import { ReviewDto } from 'src/modules/reviews/dto/review.dto';
import { BookDto } from 'src/modules/books/dto/book.dto';

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserDto {
  @ApiProperty()
  username!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ enum: ['ADMIN', 'USER'] })
  role!: UserRole;

  @ApiProperty({ type: [BookDto] })
  library?: BookDto[];

  @ApiProperty({ type: [ReviewDto] })
  reviews?: ReviewDto[];
}
