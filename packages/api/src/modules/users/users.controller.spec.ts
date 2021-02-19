import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';

describe('Users', () => {
  let app: INestApplication;

  const user = {
    username: 'test',
    email: 'test@test.com',
    role: 'USER',
  };

  let usersService = {
    findOne: () => user,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })

      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET users/:id`, async () => {
    const response = await request(app.getHttpServer()).get('/users/5').expect(200);
    expect(response.body).toEqual(usersService.findOne());
  });
});
