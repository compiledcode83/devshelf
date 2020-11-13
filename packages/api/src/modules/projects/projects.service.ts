import { PrismaClient, User, Project } from '@prisma/client';

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
