import Link from 'next/link';
import styles from './navigation.module.scss';
const Navigation = () => {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="/">
            <a>Strona główna</a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/">
            <a>Moje projekty</a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/">
            <a>Feedback</a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/">
            <a>Ustawienia</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
