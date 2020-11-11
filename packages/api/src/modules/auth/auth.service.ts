import type { Profile } from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import {
  Strategy as GoogleStrategy,
  VerifyCallback as GoogleVerifyCallback,
} from 'passport-google-oauth20';
import type { VerifyCallback as GitHubVerifyCallback } from 'passport-oauth2';
import { findUserBy, createUser } from '../user/user.service';
import { gitHubStrategyOptions, googleStrategyOptions } from '../../config/passportConfig';

const callback = async (profile: Profile, done: GitHubVerifyCallback | GoogleVerifyCallback) => {
  if (profile.emails && profile.photos) {
    const { displayName, emails, username, photos } = profile;
    const email = emails[0].value;
    const avatarUrl = photos[0].value;
    const foundUser = await findUserBy('email', profile.emails[0].value);

    if (!foundUser) {
      const savedUser = await createUser({
        name: displayName,
        email,
        login: username || '',
        avatarUrl,
      });
      return done(undefined, savedUser);
    }
  }

  return done(undefined, profile);
};

export const gitHubStrategy = new GitHubStrategy(
  gitHubStrategyOptions,
  (_request, _accessToken, _refreshToken, profile, done) => {
    return callback(profile, done);
  },
);

export const googleStrategy = new GoogleStrategy(
  googleStrategyOptions,
  (_request, _accessToken, _refreshToken, profile, done) => {
    return callback(profile, done);
  },
);
