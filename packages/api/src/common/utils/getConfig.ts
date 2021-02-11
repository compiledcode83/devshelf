type Nil<T> = T | undefined | null;

type Names = {
  readonly SESSION_SECRET: string;
  readonly SENTRY_DSN: string;
};

export function getConfig<T extends keyof Names>(name: T): Names[T];
export function getConfig(name: keyof Names): Names[keyof Names] {
  const val = process.env[name];

  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }

  return val as Names[keyof Names];
}
