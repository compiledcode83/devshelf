import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserBy = <K extends keyof User>(by: K, value: User[K]) => {
  return prisma.user.findOne({
    where: {
      [by]: value,
    },
  });
};

export const createUser = ({ email, name, login }: Pick<User, 'email' | 'name' | 'login'>) => {
  return prisma.user.create({
    data: {
      email,
      name,
      login,
    },
  });
};
