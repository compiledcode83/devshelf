import styles from './navigation.module.scss';
import ActiveLink from './activeLink/ActiveLink';

const Navigation = () => {
  return (
    <nav className={styles.wrapper}>
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
    </nav>
  );
};

export default Navigation;
