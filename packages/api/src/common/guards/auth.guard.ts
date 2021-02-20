import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionService } from '../../modules/session/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return this.sessionService.isSessionValid(request.cookies.token as string);
  }
}
