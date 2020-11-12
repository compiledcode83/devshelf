import { findMany, findOne, create } from './projects.service';
import { Router } from 'express';
import { User } from '@prisma/client';

export const projectsRouter = Router();

projectsRouter.get('/', async (req, res) => {
  console.log(req.user);
  const projects = await findMany();
  return res.status(200).json({ data: projects });
});

projectsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const project = await findOne(id);
  return res.status(200).json({ data: project });
});

projectsRouter.post('/', async (req, res) => {
  const project = await create(req.user as User['id']);
  return res.status(200).json(project);
});
