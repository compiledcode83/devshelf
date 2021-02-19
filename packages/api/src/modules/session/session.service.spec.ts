import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let sessionService: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionService, PrismaService],
    }).compile();

    sessionService = module.get<SessionService>(SessionService);
  });

  describe('findOne', () => {
    it('returns session when token is valid', async () => {
      const token = expect.any(String);

      const session = {
        id: expect.any(Number),
        token,
        expiration: expect.any(Date),
        userId: expect.any(Number),
      };

      jest.spyOn(sessionService, 'findOne').mockImplementation(() => Promise.resolve(session));

      expect(await sessionService.findOne(token)).toEqual(session);
    });

    it('throws an error when token is not valid', async () => {
      const token = expect.any(String);

      jest.spyOn(sessionService, 'findOne').mockImplementation(() => {
        throw new ForbiddenException();
      });

      expect(async () => await sessionService.findOne(token)).rejects.toThrow(
        new Error('Forbidden'),
      );
    });
  });
});
