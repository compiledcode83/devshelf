import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NewUserDto } from './dto/newUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findBy<K extends keyof User>({ by, value }: { by: K; value: User[K] }) {
    return await this.prisma.user.findUnique({
      where: {
        [by]: value,
      },
    });
  }

  async findOne(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
        role: true,
      },
    });
  }

  async create(newUser: NewUserDto) {
    return this.prisma.user.create({ data: newUser });
  }
}
