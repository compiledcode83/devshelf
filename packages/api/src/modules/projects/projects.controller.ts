import { findMany, findOne, create, remove, comment } from './projects.service';
import { Router } from 'express';
import { User, Feedback } from '@prisma/client';

export const projectsRouter = Router();

projectsRouter.get('/', async (req, res) => {
  console.log(req.query);
  const projects = await findMany();
  return res.status(200).json({ projects: projects });
});

projectsRouter.get('/:id', async (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = await findOne(projectId);
  return res.status(200).json({ ...project });
});

projectsRouter.post('/', async (req, res) => {
  const authorId = req.user as User['id'];
  const newProject = { authorId, ...req.body };
  const project = await create(newProject);
  return res.status(200).json(project);
});

projectsRouter.delete('/:id', async (req, res) => {
  const projectId = parseInt(req.params.id);
  const deletedProject = remove(projectId);
  return res.status(200).json(deletedProject);
});

projectsRouter.post('/:id/feedback', async (req, res) => {
  const content = req.body.content as Feedback['content'];
  const authorId = req.user as User['id'];
  const projectId = parseInt(req.params.id);
  const newComment = await comment({ content, projectId, authorId });
  return res.status(200).json(newComment);
});
