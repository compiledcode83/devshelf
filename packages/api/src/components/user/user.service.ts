import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByEmail = (email: User['email']) => {
  return prisma.user.findOne({
    where: { email },
  });
};

export const findUserById = (id: User['id']) => {
  return prisma.user.findOne({
    where: { id },
  });
};

type CreateUserType = {
  email: string;
  name: string;
  login: string;
};

export const createUser = ({ email, name, login }: CreateUserType) => {
  return prisma.user.create({
    data: {
      email,
      name,
      login,
    },
  });
};
