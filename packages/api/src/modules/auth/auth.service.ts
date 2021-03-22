import {
  ImATeapotException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as zxcvbn from 'zxcvbn';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/modules/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly sessionService: SessionService,
  ) {}

  private async hashPassword(password: string) {
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }

  private isPasswordStrongEnough(password: string) {
    const result = zxcvbn(password);
    return result.score >= 3;
  }

  async login({ email, password }: LoginDto) {
    const foundUser = await this.usersService.findBy<'email'>({ by: 'email', value: email });
    const hashedPassword = await this.hashPassword(password);
    const arePasswordsEqual = bcrypt.compare(foundUser && foundUser.password, hashedPassword);

    if (!foundUser || !arePasswordsEqual) {
      throw new NotFoundException('Invalid credentials');
    }

    return this.sessionService.create(foundUser.id);
  }

  async register({ username, email, password }: RegisterDto) {
    const foundUser = await this.usersService.findBy<'email'>({ by: 'email', value: email });

    if (foundUser) {
      throw new ImATeapotException('Account already exists');
    }

    if (!this.isPasswordStrongEnough(password)) {
      throw new BadRequestException('Password is too easy');
    }

    const hashedPassword = await this.hashPassword(password);

    this.usersService.create({ username, email, password: hashedPassword });
  }
}
