import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import type { Request } from 'express';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SessionService } from '../session/session.service';

describe('ReviewsService', () => {
  let reviewsService: ReviewsService;
  const review = {
    id: 1,
    content: '',
    rating: 2,
    bookId: 3,
    authorId: 2,
  } as const;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsService, PrismaService, UsersService, SessionService],
    }).compile();

    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('returns a review with given id', async () => {
      const reviewId = 1;

      jest.spyOn(reviewsService, 'findOne').mockImplementation(() => Promise.resolve(review));

      expect(await reviewsService.findOne({ id: reviewId })).toEqual(review);
    });
    it("returns null when given id doesn't match any review", async () => {
      const reviewId = 0;

      jest.spyOn(reviewsService, 'findOne').mockImplementation(() => Promise.resolve(null));

      expect(await reviewsService.findOne({ id: reviewId })).toBe(null);
    });
  });

  describe('findAll', () => {
    it('returns list of reviews', async () => {
      const reviews = [review];

      jest.spyOn(reviewsService, 'findAll').mockImplementation(() => Promise.resolve(reviews));

      expect(await reviewsService.findAll()).toEqual(reviews);
    });
  });

  describe('create', () => {
    it('returns new review', async () => {
      jest.spyOn(reviewsService, 'create').mockImplementation(() => Promise.resolve(review));

      expect(
        await reviewsService.create({ content: '', rating: 2, authorId: 2, bookId: 3 }),
      ).toEqual(review);
    });
  });

  describe('remove', () => {
    it('returns removed book', async () => {
      const req: Pick<Request, 'cookies'> = { cookies: { token: '' } };
      const reviewId = 1;

      jest.spyOn(reviewsService, 'remove').mockImplementation(() => Promise.resolve(review));

      expect(await reviewsService.remove(req as Request, reviewId)).toEqual(review);
    });

    it('throws an error when ids do not matches', async () => {
      const req: Pick<Request, 'cookies'> = { cookies: { token: '' } };
      const reviewId = 1;

      jest.spyOn(reviewsService, 'remove').mockImplementation(() => {
        throw new ForbiddenException();
      });

      expect(async () => await reviewsService.remove(req as Request, reviewId)).rejects.toThrow(
        new Error('Forbidden'),
      );
    });
  });
});
