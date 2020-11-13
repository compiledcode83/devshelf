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

export const findUserById = async (id: User['id']) => {
  return await prisma.user.findOne({
    where: {
      id,
    },
  });
};

type CreateUser = Pick<User, 'id' | 'email' | 'name' | 'login' | 'avatarUrl' | 'provider'>;

export const createUser = async ({ id, email, name, login, avatarUrl, provider }: CreateUser) => {
  return await prisma.user.create({
    data: {
      id,
      email,
      name,
      login,
      avatarUrl,
      provider,
    },
  });
};
