import dotenv from 'dotenv';
import { StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { getEnvVariable } from '../utils/getEnvVariable';
dotenv.config();

export const googleStrategyOptions: StrategyOptionsWithRequest = {
  clientID: getEnvVariable('GOOGLE_CLIENT_ID'),
  clientSecret: getEnvVariable('GOOGLE_CLIENT_SECRET'),
  callbackURL: getEnvVariable('GOOGLE_CALLBACK_URL'),
  passReqToCallback: true,
};

export const gitHubStrategyOptions = {
  clientID: getEnvVariable('GITHUB_ID'),
  clientSecret: getEnvVariable('GITHUB_SECRET'),
  callbackURL: getEnvVariable('GITHUB_CALLBACK_URL'),
};
