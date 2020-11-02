import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByEmail = (email: string) => {
  return prisma.user.findOne({
    where: { email },
  });
};

export const createUser = (email: string, name: string, login: string) => {
  return prisma.user.create({
    data: {
      email,
      name,
      login,
    },
  });
};
