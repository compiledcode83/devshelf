type Names = Readonly<{
  GITHUB_ID: string;
  GITHUB_SECRET: string;
  GITHUB_CALLBACK_URL: string;
  SESSION_SECRET: string;
  ORIGIN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  COOKIE_EXPIRATION_TIME: string;
}>;

export const getEnvVariable = <T extends keyof Names>(name: T): Names[T] => {
  const value = process.env[name];
  if (value !== undefined) {
    return value;
  } else {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }
};
