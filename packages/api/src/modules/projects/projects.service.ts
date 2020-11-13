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

export const create = async (userId: User['id']) => {
  return await prisma.project.create({
    data: {
      title: 'New awesome project-1',
      description: 'desc',
      author: {
        connect: { id: userId },
      },
    },
  });
};

export const remove = async (id: string) => {
  return await prisma.project.delete({
    where: {
      id: Number(id),
    },
  });
};
