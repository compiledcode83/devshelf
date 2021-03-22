import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionService } from '../../modules/session/session.service';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.token as string;
    const loginUser = await this.sessionService.findOne(token);

    if (!loginUser) {
      return false;
    }

    const user = await this.usersService.findOne(loginUser.userId);
    return user && user.role === 'ADMIN' ? true : false;
  }
}
