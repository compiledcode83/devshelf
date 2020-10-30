import styles from './navigation.module.scss';
import ActiveLink from './activeLink/ActiveLink';

const Navigation = () => {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Strona główna</a>
          </ActiveLink>
        </li>
        <li className={styles.listItem}>
          <ActiveLink href="/projects" activeClassName={styles.active}>
            <a>Moje projekty</a>
          </ActiveLink>
        </li>
        <li className={styles.listItem}>
          <ActiveLink href="/feedback" activeClassName={styles.active}>
            <a>Feedback</a>
          </ActiveLink>
        </li>
        <li className={styles.listItem}>
          <ActiveLink href="/settings" activeClassName={styles.active}>
            <a>Ustawienia</a>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
