import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('returns user with given id', async () => {
      const user = {
        username: 'test',
        email: 'test',
        role: 'USER',
      } as const;

      jest.spyOn(usersService, 'findOne').mockImplementation(() => Promise.resolve(user));

      expect(await usersService.findOne(1)).toEqual(user);
    });
    it("returns null when given id doesn't match any user", async () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(() => Promise.resolve(null));

      expect(await usersService.findOne(44)).toBe(null);
    });
  });

  describe('findBy', () => {
    it('returns users for given email', async () => {
      const user = {
        id: 1,
        username: 'test',
        email: 'test',
        password: 'test',
        createdAt: new Date(),
        role: 'USER',
      } as const;

      jest.spyOn(usersService, 'findBy').mockImplementation(() => Promise.resolve(user));
      expect(
        await usersService.findBy<'email'>({ by: 'email', value: 'test' }),
      ).toEqual(user);
    });
  });

  describe('create', () => {
    it('returns new user', async () => {
      const user = {
        id: 1,
        username: 'test',
        email: 'test',
        password: 'test',
        createdAt: new Date(),
        role: 'USER',
      } as const;

      jest.spyOn(usersService, 'create').mockImplementation(() => Promise.resolve(user));
      expect(
        await usersService.create({ username: 'test', email: 'test', password: 'test' }),
      ).toEqual(user);
    });
  });
});
