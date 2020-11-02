import { Strategy as GitHubStrategy } from 'passport-github2';
import type { VerifyFunction } from 'passport-oauth2';
import bcrypt from 'bcrypt';
import { generateCrypto } from '../utils/generateCrypto';

const strategyOptions = {
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  profileFields: ['displayName', 'emails'],
} as const;
