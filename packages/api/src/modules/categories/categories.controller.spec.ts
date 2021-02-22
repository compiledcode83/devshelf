import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CategoriesService } from './categories.service';
import { CategoriesModule } from './categories.module';

describe('Categories', () => {
  let app: INestApplication;

  const category = {
    id: 1,
    name: 'test',
  };

  const categoriesService = {
    findOne: () => category,
    findAll: () => [category],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CategoriesModule],
    })

      .overrideProvider(CategoriesService)
      .useValue(categoriesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET categories/`, async () => {
    const response = await request(app.getHttpServer()).get('/categories').expect(200);
    expect(response.body).toEqual(categoriesService.findAll());
  });

  it(`/GET categories/:id `, async () => {
    const response = await request(app.getHttpServer()).get('/categories/1').expect(200);
    expect(response.body).toEqual(categoriesService.findOne());
  });
});
