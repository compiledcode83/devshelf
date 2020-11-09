import { findMany, findOne } from './projects.service';
import { Router } from 'express';

export const projectsRouter = Router();

projectsRouter.get('/', async (_req, res) => {
  const projects = await findMany();
  return res.status(200).json({ data: projects });
});

projectsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const project = await findOne(id);
  return res.status(200).json({ data: project });
});
