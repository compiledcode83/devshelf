import { Injectable } from '@nestjs/common';
import type { Response } from 'express';

@Injectable()
export class CookiesService {
  async setTokenInCookies(res: Response, token: string) {
    res.cookie('token', token, {
      domain: 'api.devshelf.localhost',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
    });
  }
}
