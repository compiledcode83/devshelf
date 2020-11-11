import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

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

export const create = async (req: Request) => {
  console.log('PROJECT USER', req.user);
  return await prisma.project.create({
    data: {
      title: 'New awesome project-1',
      description: 'desc',
      author: {
        connect: { id: req.user as string },
      },
    },
  });
};
