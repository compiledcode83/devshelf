import { Injectable } from '@nestjs/common';
import type { RequestWithCookies } from 'src/common/types/types';

@Injectable()
export class CookiesService {
  async setTokenInCookies(req: any, token: string) {
    req.cookie('token', token, {
      domain: 'api.devshelf.localhost',
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
    });
    // req._cookies = [
    //   {
    //     name: 'token',
    //     value: token,
    //     options: {
    //       domain: 'api.devshelf.localhost',
    //       httpOnly: true,
    //       secure: true,
    //       sameSite: 'Lax',
    //     },
    //   },
    // ];
  }
}
