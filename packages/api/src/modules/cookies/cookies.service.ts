import { Injectable } from '@nestjs/common';
import type { RequestWithCookies } from 'src/common/types/types';

@Injectable()
export class CookiesService {
  setTokenInCookies(req: RequestWithCookies, token: string) {
    req._cookies = [
      {
        name: 'token',
        value: token,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'Lax',
        },
      },
    ];
  }
}
