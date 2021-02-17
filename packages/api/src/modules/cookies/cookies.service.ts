import { Injectable } from '@nestjs/common';
import type { Response } from 'express';
import { getConfig } from '../../common/utils/getConfig';

@Injectable()
export class CookiesService {
  async setTokenInCookies(res: Response, token: string) {
    res.cookie('token', token, {
      domain: getConfig('COOKIE_DOMAIN'),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
    });
  }
}
