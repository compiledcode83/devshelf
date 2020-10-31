import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './submenu.module.scss';
import ActiveLink from './activeLink/ActiveLink';
import useIntersection from 'shared/hooks/useIntersection';
import cn from 'classnames';
import { HeaderProvider, useHeaderState } from '../shared/stores/HeaderContext';

const Submenu = () => {
  const { isMenuVisible } = useHeaderState();
  const navigationRef = useRef<HTMLElement>(null!);

  const isOnScreen = useIntersection<HTMLElement>(navigationRef, {
    rootMargin: '0px',
  });

  return (
    <nav ref={navigationRef} className={styles.navigation} aria-label="Menu poboczne">
      <div className={cn(styles.wrapper, { [styles.sticky]: !isOnScreen && !isMenuVisible })}>
        <div className={styles.shadow} />
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <ActiveLink href="/" activeClassName={styles.activeLink}>
              <a className={styles.link}>Strona główna</a>
            </ActiveLink>
          </li>
          <li className={styles.listItem}>
            <ActiveLink href="/projects" activeClassName={styles.activeLink}>
              <a className={styles.link}>Moje projekty</a>
            </ActiveLink>
          </li>
          <li className={styles.listItem}>
            <ActiveLink href="/feedback" activeClassName={styles.activeLink}>
              <a className={styles.link}>Feedback</a>
            </ActiveLink>
          </li>
          <li className={styles.listItem}>
            <ActiveLink href="/settings" activeClassName={styles.activeLink}>
              <a className={styles.link}>Ustawienia</a>
            </ActiveLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Submenu;
