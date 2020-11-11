import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findMany = async () => {
  return await prisma.project.findMany({
    include: {
      author: true,
    },
  });
};

export const findOne = async (id: string) => {
  return await prisma.project.findOne({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
    },
  });
};

export const create = async () => {
  return await prisma.project.create({
    data: {
      title: 'New awesome project-1',
      description: 'desc',
      author: {
        connect: { id: 12 },
      },
    },
  });
};
