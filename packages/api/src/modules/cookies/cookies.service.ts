import { Injectable } from '@nestjs/common';
import type { RequestWithCookies } from 'src/common/types/types';

@Injectable()
export class CookiesService {
  async setTokenInCookies(req: RequestWithCookies, token: string) {
    req._cookies = [
      {
        name: 'token',
        value: token,
        options: {
          domain: '.devshelf.localhost',
          httpOnly: true,
          secure: true,
          sameSite: 'Lax',
        },
      },
    ];
  }
}
