import { Router } from 'express';
import { getUsers, findOne } from './users.service';

export const usersRouter = Router();

usersRouter.get('/', (_req, res) => {
  const users = getUsers();
  return res.send(200).json(users);
});

usersRouter.get('/:id', (req, res) => {
  const userId = req.params.id;
  const user = findOne(userId);
  return res.send(200).json(user);
});
