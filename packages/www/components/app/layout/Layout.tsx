import type { ReactNode } from 'react';
import styles from './layout.module.scss';

type LayoutProps = { children: ReactNode };

export const Layout = ({ children }: LayoutProps) => (
  <div className={styles.wrapper}>{children}</div>
);
