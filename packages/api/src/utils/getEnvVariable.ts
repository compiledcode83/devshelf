export const getEnvVariable = (name: string): string => {
  const val = process.env[name];
  if (val !== undefined) {
    return val;
  } else {
    throw new Error(`Wrong process.env[${name}]`);
  }
};
