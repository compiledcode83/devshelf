import { Strategy as GitHubStrategy } from 'passport-github2';
import type { VerifyCallback } from 'passport-oauth2';
import { findUserByEmail, createUser } from '../user/user.service';
import dotenv from 'dotenv';
import { getEnvVariable } from '../../utils/getEnvVariable';
dotenv.config();

const strategyOptions = {
  clientID: getEnvVariable('GITHUB_ID'),
  clientSecret: getEnvVariable('GITHUB_SECRET'),
  callbackURL: getEnvVariable('GITHUB_CALLBACK_URL'),
  profileFields: ['displayName', 'emails'],
};

type VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  results: any,
  profile: any,
  verified: VerifyCallback,
) => void;

const verifyCallback: VerifyFunction = async (
  _accessToken,
  _refreshToken,
  _results,
  profile,
  done,
) => {
  try {
    if (profile && profile.emails && profile.emails[0]) {
      console.log(_results, profile);
      const username = profile.displayName;
      const email = profile.emails[0].value;
      const user = await findUserByEmail(email);
      console.log(user);
      if (user) return done(null, user);
      const testLogin = 'aaa';
      const createdUser = await createUser(email, username, testLogin);
      return done(null, createdUser);
    } else {
      return done(new Error(), undefined);
    }
  } catch (error) {
    return done(new Error(), undefined);
  }
};

export const strategy = new GitHubStrategy(strategyOptions, verifyCallback);
