import { useCallback, useRef } from 'react';
import Link from 'next/link';
import styles from './list.module.scss';
import CommentIcon from '../../../../public/icons/comment.svg';
import ProjectIcon from '../../../../public/icons/project.svg';
import HomeIcon from '../../../../public/icons/home.svg';

const List = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list} id="navigationList" aria-label="Dodatkowe informacje">
        <li className={styles.listItem}>
          <Link href="/">
            <a className={styles.link}>
              <HomeIcon aria-hidden="true" className={styles.icon} />
              Strona główna
            </a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/">
            <a className={styles.link}>
              <ProjectIcon aria-hidden="true" className={styles.icon} />
              Moje projekty
            </a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/">
            <a className={styles.link}>
              <CommentIcon aria-hidden="true" className={styles.icon} />
              Feedback
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default List;
