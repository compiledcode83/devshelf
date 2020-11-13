import { PrismaClient, User, Project, Feedback } from '@prisma/client';

const prisma = new PrismaClient();

export const findMany = async () => {
  return await prisma.project.findMany({
    include: {
      author: true,
    },
  });
};

export const findOne = async (id: Project['id']) => {
  return await prisma.project.findOne({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
};

type NewProject = {
  title: Project['title'];
  description: Project['description'];
  authorId: User['id'];
};

export const create = async ({ title, description, authorId }: NewProject) => {
  return await prisma.project.create({
    data: {
      title,
      description,
      author: {
        connect: { id: authorId },
      },
    },
  });
};

export const remove = async (id: Project['id']) => {
  return await prisma.project.delete({
    where: {
      id,
    },
  });
};

type NewComment = {
  content: Feedback['content'];
  authorId: string;
  projectId: number;
};

export const comment = async ({ content, projectId, authorId }: NewComment) => {
  return await prisma.feedback.create({
    data: {
      content,
      project: {
        connect: { id: projectId },
      },
      author: {
        connect: { id: authorId },
      },
    },
  });
};
