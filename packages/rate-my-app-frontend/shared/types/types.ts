import { ReactNode } from 'react';

export type Nil<T> = T | null | undefined;

export type WithChildren<T = {}> = T & { children: ReactNode };

type As<Props = any> = React.ElementType<Props>;

export type PropsWithAs<Props = {}, Type extends As = As> = Props &
  Omit<React.ComponentProps<Type>, 'as' | keyof Props> & {
    as?: Type;
  };
