import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NewUserDto } from './dto/newUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserBy<K extends keyof User>({ by, value }: { by: K; value: User[K] }) {
    return await this.prisma.user.findUnique({
      where: {
        [by]: value,
      },
    });
  }

  async create(newUser: NewUserDto) {
    return this.prisma.user.create({ data: newUser });
  }
}
