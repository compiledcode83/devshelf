import { ReactNode } from 'react';

export type Nil<T> = T | null | undefined;

export type WithChildren<T = {}> = T & { children: ReactNode };
