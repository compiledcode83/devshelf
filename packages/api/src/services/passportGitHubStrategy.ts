import { Strategy as GitHubStrategy } from 'passport-github2';
import type { VerifyFunction } from 'passport-oauth2';
import { findUserByEmail, createUser } from './user';
import dotenv from 'dotenv';
dotenv.config();

const strategyOptions = {
  clientID: process.env.GITHUB_ID as string,
  clientSecret: process.env.GITHUB_SECRET as string,
  callbackURL: process.env.GITHUB_CALLBACK_URL as string,
  profileFields: ['displayName', 'emails'],
};

//@ts-ignore
const verifyCallback: VerifyFunction = async (_accessToken, _refreshToken, profile, done) => {
  try {
    if (profile && profile.emails && profile.emails[0]) {
      const username = profile.displayName;
      const email = profile.emails[0].value;
      const user = await findUserByEmail(email);
      console.log(user);
      if (user) return done(null, user);
      const testLogin = 'aaa';
      const createdUser = await createUser(email, username, testLogin);
      return done(null, createdUser);
    } else {
      return done('There is no provided email', false);
    }
  } catch (error) {
    return done('Account not created', false);
  }
};

export const strategy = new GitHubStrategy(strategyOptions, verifyCallback);
