import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksService } from './books.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { BooksModule } from './books.module';

describe('ReviewsController', () => {
  let app: INestApplication;

  const book = {
    id: 1,
    title: '',
    description: '',
    authorId: 2,
    categoryId: 1,
    publishedDate: '',
    averageRating: 2,
    ratingsCount: 2,
    thumbnail: '',
    language: '',
    linkToRead: '',
    isPublic: true,
  };

  let booksService = {
    findOne: () => book,
    findAll: () => [book],
    create: () => book,
    update: () => book,
    remove: () => book,
  };

  let isAuthenticated = true;
  let isAdmin = true;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BooksModule],
    })

      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleRef.createNestApplication();
    const authGuard = moduleRef.get(AuthGuard);
    const adminGuard = moduleRef.get(AdminGuard);
    authGuard.canActivate = jest.fn(() => Promise.resolve(isAuthenticated));
    adminGuard.canActivate = jest.fn(() => Promise.resolve(isAdmin));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET books/', async () => {
    const response = await request(app.getHttpServer()).get('/books').expect(200);
    expect(response.body).toEqual(booksService.findAll());
  });

  it('/GET books/:id', async () => {
    const response = await request(app.getHttpServer()).get('/books/1').expect(200);
    expect(response.body).toEqual(booksService.findOne());
  });

  describe('/POST books/', () => {
    it('with authenticated user', async () => {
      isAdmin = false;
      await request(app.getHttpServer()).post('/books').send(book).expect(403);
    });

    it('with unauthenticated user', async () => {
      isAdmin = false;
      isAuthenticated = false;

      await request(app.getHttpServer()).post('/books').send(book).expect(403);
    });
  });

  describe('PUT /books/:id', () => {
    it('with unauthorized user', async () => {
      isAdmin = false;
      isAuthenticated = false;
      await request(app.getHttpServer()).put('/books/3').send(book).expect(403);
    });

    it('with authorized user', async () => {
      isAdmin = false;
      await request(app.getHttpServer()).put('/books/3').send(book).expect(403);
    });
  });

  describe('DELETE /books/:id', () => {
    it('with unauthorized user', async () => {
      isAdmin = false;
      isAuthenticated = false;
      await request(app.getHttpServer()).delete('/books/3').send(book).expect(403);
    });

    it('with authorized user', async () => {
      isAdmin = false;
      await request(app.getHttpServer()).delete('/books/3').send(book).expect(403);
    });
  });
});
