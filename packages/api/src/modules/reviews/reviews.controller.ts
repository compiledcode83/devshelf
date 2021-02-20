import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  Body,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from '../reviews/dto/review.dto';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';
import type { Request } from 'express';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCookieAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../common/guards/auth.guard';
import { createReviewSchema, updateReviewSchema } from './reviews.schema';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { UpdateReviewDto } from './dto/updateReview.dto';

@ApiTags('reviews')
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

  @Put('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe(updateReviewSchema))
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Update review' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(
    @Req() req: Request,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: UpdateReviewDto,
  ) {
    return this.reviewsService.update({ req, id, data });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Delete review' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  remove(@Req() req: Request, @Param('id', new ParseIntPipe()) id: number) {
    return this.reviewsService.remove(req, id);
  }
}
