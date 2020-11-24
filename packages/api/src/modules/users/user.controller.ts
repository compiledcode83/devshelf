import { Router } from 'express';
import { User, Feedback } from '@prisma/client';
import { getUsers, findOne } from './users.service';

export const usersRouter = Router();

usersRouter.get('/', (_req, res) => {
  const users = getUsers();
  return res.send(200).json(users);
});
