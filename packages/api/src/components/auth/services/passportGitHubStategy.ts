import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import type { VerifyCallback } from 'passport-google-oauth20';
import { findUserByEmail, createUser } from '../../user/user.service';
import dotenv from 'dotenv';
import { getEnvVariable } from '../../../utils/getEnvVariable';

dotenv.config();

const strategyOptions = {
  clientID: getEnvVariable('GITHUB_ID'),
  clientSecret: getEnvVariable('GITHUB_SECRET'),
  callbackURL: getEnvVariable('GITHUB_CALLBACK_URL'),
  profileFields: ['displayName', 'emails', 'username'],
};

type VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  verified: VerifyCallback,
) => void;

const verifyCallback: VerifyFunction = async (_accessToken, _refreshToken, profile, done) => {
  if (profile.emails && profile.displayName) {
    const foundUser = await findUserByEmail(profile.emails[0].value);
    if (!foundUser) {
      const savedUser = await createUser({
        name: profile.displayName,
        email: profile.emails[0].value,
        login: profile.username || '',
      });
      return done(undefined, savedUser);
    }
  } else {
    done(undefined, false);
  }
};

export const strategy = new GitHubStrategy(strategyOptions, verifyCallback);
