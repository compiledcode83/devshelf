import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ReviewsModule } from './reviews.module';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '../../common/guards/auth.guard';

describe('ReviewsController', () => {
  let app: INestApplication;

  const review = {
    id: 3,
    content: 'content',
    rating: 2,
    bookId: 4,
    authorId: 5,
  } as const;

  let reviewsService = {
    findOne: () => review,
    findAll: () => [review],
    create: () => review,
    update: () => review,
    remove: () => review,
  };

  let isAuthenticated = true;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ReviewsModule],
    })

      .overrideProvider(ReviewsService)
      .useValue(reviewsService)
      .compile();

    app = moduleRef.createNestApplication();
    const guard = moduleRef.get(AuthGuard);
    guard.canActivate = jest.fn(() => Promise.resolve(isAuthenticated));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET reviews/', async () => {
    const response = await request(app.getHttpServer()).get('/reviews').expect(200);
    expect(response.body).toEqual(reviewsService.findAll());
  });

  it('/GET reviews/:id', async () => {
    const response = await request(app.getHttpServer()).get('/reviews/1').expect(200);
    expect(response.body).toEqual(reviewsService.findOne());
  });

  it('/POST reviews/', async () => {
    const review = {
      content: 'content',
      bookId: 1,
      authorId: 2,
      rating: 3,
    } as const;

    const response = await request(app.getHttpServer()).post('/reviews').send(review).expect(201);

    expect(response.body).toEqual(reviewsService.create());
  });

  it('/POST reviews/ with unauthenticated user', async () => {
    isAuthenticated = false;
    const review = {
      content: 'content',
      bookId: 1,
      authorId: 2,
      rating: 3,
    } as const;

    await request(app.getHttpServer()).post('/reviews').send(review).expect(403);
  });

  it('/PUT reviews/:id with unauthorized user', async () => {
    const review = {
      content: 'content',
      rating: 3,
    } as const;

    await request(app.getHttpServer()).put('/reviews/3').send(review).expect(403);
  });
});
