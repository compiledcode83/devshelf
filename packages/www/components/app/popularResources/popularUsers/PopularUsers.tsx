import Link from 'next/link';
import styles from './popularUsers.module.scss';

const PopularUsers = () => {
  return (
    <aside className={styles.wrapper}>
      <section className={styles.resource}>
        <h2 id="best-users" className={styles.heading}>
          Najlepsi użytkownicy
        </h2>
        <ul aria-labelledby="best-users" className={styles.list}>
          <li className={styles.listItem}>
            <Link href="#">
              <a className={styles.link}>
                <img src="/images/user.png" className={styles.userImage} />
                <p className={styles.username}>Ronnie Stephens</p>
              </a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="#">
              <a className={styles.link}>
                <img src="/images/user.png" className={styles.userImage} />
                <p className={styles.username}>Ronnie Stephens</p>
              </a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="#">
              <a className={styles.link}>
                <img src="/images/user.png" className={styles.userImage} />
                <p className={styles.username}>Ronnie Stephens</p>
              </a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="#">
              <a className={styles.link}>
                <img src="/images/user.png" className={styles.userImage} />
                <p className={styles.username}>Ronnie Stephens</p>
              </a>
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default PopularUsers;
