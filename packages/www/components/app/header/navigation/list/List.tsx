import { useCallback, useRef } from 'react';
import Link from 'next/link';
import styles from './list.module.scss';
import CommentIcon from '../../../../../public/icons/comment.svg';
import ProjectIcon from '../../../../../public/icons/project.svg';
import HomeIcon from '../../../../../public/icons/home.svg';
import ActiveLink from '../activeLink/ActiveLink';

const List = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list} id="navigationList" aria-label="Dodatkowe informacje">
        <li className={styles.listItem}>
          <ActiveLink href="/" activeClassName={styles.activeLink}>
            <a className={styles.link}>
              <HomeIcon aria-hidden="true" className={styles.icon} />
              Strona główna
            </a>
          </ActiveLink>
        </li>
        <li className={styles.listItem}>
          <ActiveLink href="/projekty" activeClassName={styles.activeLink}>
            <a className={styles.link}>
              <ProjectIcon aria-hidden="true" className={styles.icon} />
              Moje projekty
            </a>
          </ActiveLink>
        </li>
        <li className={styles.listItem}>
          <ActiveLink href="/feedback" activeClassName={styles.activeLink}>
            <a className={styles.link}>
              <CommentIcon aria-hidden="true" className={styles.icon} />
              Feedback
            </a>
          </ActiveLink>
        </li>
      </ul>
    </div>
  );
};

export default List;
