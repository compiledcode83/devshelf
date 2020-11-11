// import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import type { VerifyCallback } from 'passport-google-oauth20';
// import { findUserBy, createUser } from '../../user/user.service';
// import { gitHubStrategyOptions, googleStategyOptions } from '../../../config/passportConfig';

// type VerifyFunction = (
//   accessToken: string,
//   refreshToken: string,
//   profile: Profile,
//   verified: VerifyCallback,
// ) => void;

// const strategyCallback: VerifyFunction = async (_accessToken, _refreshToken, profile, done) => {
//   if (profile.emails && profile.displayName) {
//     const foundUser = await findUserBy('email', profile.emails[0].value);
//     if (!foundUser) {
//       const savedUser = await createUser({
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         login: profile.username || '',
//       });
//       return done(undefined, savedUser);
//     }
//   } else {
//     done(undefined, false);
//   }
// };

// export const gitHubStrategy = new GitHubStrategy(gitHubStrategyOptions, strategyCallback);
// export const googleStrategy = new GoogleStrategy(googleStategyOptions, strategyCallback);
