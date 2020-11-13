import { findMany, findOne, create, remove } from './projects.service';
import { Router } from 'express';
import { User } from '@prisma/client';

export const projectsRouter = Router();

projectsRouter.get('/', async (_req, res) => {
  const projects = await findMany();
  return res.status(200).json({ projects: projects });
});

projectsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const project = await findOne(Number(id));
  return res.status(200).json({ ...project });
});

projectsRouter.post('/', async (req, res) => {
  const authorId = req.user as User['id'];
  const newProject = { authorId, ...req.body };
  const project = await create(newProject);
  return res.status(200).json(project);
});

projectsRouter.delete('/:id', async (req, res) => {
  const deletedProject = remove(Number(req.params.id));
  return res.status(200).json(deletedProject);
});
