import { Controller, Get, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from 'src/modules/reviews/dto/review.dto';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ type: [ReviewDto] })
  async findAll() {
    return this.reviewsService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get book' })
  @ApiOkResponse({ type: ReviewDto })
  @ApiNotFoundResponse({ description: 'There is no review with this id' })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.reviewsService.findOne({ id });
  }
}
