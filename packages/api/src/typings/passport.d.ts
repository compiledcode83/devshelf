import type { Handler } from 'express';
import type { User } from '@prisma/client';
import type { AuthenticateOptions } from 'passport';
import type { AuthenticateOptionsGoogle } from 'passport-google-oauth20';
import { PASSPORT_GOOGLE, PASSPORT_GITHUB } from '../constants/passport';

/* eslint-disable */
declare module 'passport' {
  interface Authenticator<
    InitializeRet = Handler,
    AuthenticateRet = any,
    AuthorizeRet = AuthenticateRet,
    AuthorizeOptions = AuthenticateOptions
  > {
    authenticate(
      strategy: typeof PASSPORT_GOOGLE,
      options: AuthenticateOptionsGoogle,
      callback: (error: Error, user: User) => void,
    ): AuthenticateRet;
    authenticate(
      strategy: typeof PASSPORT_GITHUB,
      options: AuthenticateOptions,
      callback: (error: Error, user: User) => void,
    ): AuthenticateRet;
  }
}
