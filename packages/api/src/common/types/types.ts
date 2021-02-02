import type { CookieOptions } from '@nestjsplus/cookies';

export type RequestWithCookies = {
  _cookies: {
    name: string;
    value: string;
    options?: CookieOptions;
  }[];
} & Request;

type Cookie = {
  token: string;
};

export type CookiesType = Cookie;
