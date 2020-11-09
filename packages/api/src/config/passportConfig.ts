import dotenv from 'dotenv';
import { getEnvVariable } from '../utils/getEnvVariable';
dotenv.config();

const profileFields = ['displayName', 'emails', 'username'] as const;

export const googleStategyOptions = {
  clientID: getEnvVariable('GOOGLE_CLIENT_ID'),
  clientSecret: getEnvVariable('GOOGLE_CLIENT_SECRET'),
  callbackURL: getEnvVariable('GOOGLE_CALLBACK_URL'),
  profileFields: profileFields,
};

export const gitHubStrategyOptions = {
  clientID: getEnvVariable('GITHUB_ID'),
  clientSecret: getEnvVariable('GITHUB_SECRET'),
  callbackURL: getEnvVariable('GITHUB_CALLBACK_URL'),
  profileFields: profileFields,
};
