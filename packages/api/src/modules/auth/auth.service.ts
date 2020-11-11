import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { VerifyCallback as GitHubVerifyCallback } from 'passport-oauth2';
import { findUserBy, createUser } from '../user/user.service';
import { gitHubStrategyOptions, googleStategyOptions } from '../../config/passportConfig';
import type { VerifyCallback as GoogleVerifyCallback } from 'passport-google-oauth20';
import type { Profile } from 'passport';

const callback = async (profile: Profile, done: GitHubVerifyCallback | GoogleVerifyCallback) => {
  if (profile.emails && profile.emails) {
    const foundUser = await findUserBy('email', profile.emails[0].value);

    if (!foundUser) {
      const savedUser = await createUser({
        name: profile.displayName,
        email: profile.emails[0].value,
        login: profile.username || '',
      });
      console.log('NEW USER!!!!');
      return done(undefined, savedUser);
    }
  }

  console.log(profile);

  return done(undefined, profile);
};

export const gitHubStrategy = new GitHubStrategy(
  gitHubStrategyOptions,
  (_request, _accessToken, _refreshToken, profile, done) => {
    return callback(profile, done);
  },
);

export const googleStrategy = new GoogleStrategy(
  googleStategyOptions,
  (_request, _accessToken, _refreshToken, profile, done) => {
    return callback(profile, done);
  },
);
