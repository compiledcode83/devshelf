import type { ReactNode } from 'react';

export type Nil<T> = T | null | undefined;

export type WithChildren<T = {}> = T & { children: ReactNode };

type As<Props = any> = React.ElementType<Props>;

export type PropsWithAs<Props = {}, Type extends As = As> = Props &
  Omit<React.ComponentProps<Type>, 'as' | keyof Props> & {
    as?: Type;
  };

export type ComponentWithAs<Props, DefaultType extends As> = {
  <Type extends As>(props: PropsWithAs<Props, Type> & { as: Type }): JSX.Element;
  (props: PropsWithAs<Props, DefaultType>): JSX.Element;
};
