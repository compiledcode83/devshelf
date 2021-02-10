import { Controller, Get, Param, Post, UseGuards, UsePipes, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from 'src/modules/reviews/dto/review.dto';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCookieAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { createReviewSchema } from './reviews.schema';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe(createReviewSchema))
  @ApiBody({ type: ReviewDto })
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Create new review' })
  @ApiCreatedResponse({ description: 'The review has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() newReview: ReviewDto) {
    return this.reviewsService.create(newReview);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiOkResponse({ type: [ReviewDto] })
  async findAll() {
    return this.reviewsService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get review' })
  @ApiOkResponse({ type: ReviewDto })
  @ApiNotFoundResponse({ description: 'There is no review with this id' })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.reviewsService.findOne({ id });
  }
}
