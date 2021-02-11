import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiProperty()
  content!: string;

  @ApiProperty()
  rating!: number;
}
