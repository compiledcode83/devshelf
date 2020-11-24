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

export const deleteUser = async (id: User['id']) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const getUserProjects = async (userId: User['id']) => {
  return await prisma.project.findMany({
    where: {
      authorId: userId,
    },
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const findOne = async (userId: User['id']) => {
  return await prisma.user.findOne({
    where: {
      id: userId,
    },
  });
};
