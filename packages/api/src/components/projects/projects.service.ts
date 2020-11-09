import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findMany = async () => {
  return await prisma.project.findMany();
};
