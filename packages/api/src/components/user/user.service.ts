import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserBy = async <K extends keyof User>(by: K, value: User[K]) => {
  return await prisma.user.findOne({
    where: {
      [by]: value,
    },
  });
};

export const createUser = async ({
  email,
  name,
  login,
}: Pick<User, 'email' | 'name' | 'login'>) => {
  return await prisma.user.create({
    data: {
      email,
      name,
      login,
    },
  });
};
