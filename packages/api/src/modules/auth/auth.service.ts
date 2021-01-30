import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import crypto from 'crypto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  generateToken() {
    const token = crypto.randomBytes(64).toString('hex');
    return token;
  }

  login({ username, email, password }: LoginDto) {}
}
