import Link from 'next/link';
import styles from './profile.module.scss';

export const Profile = () => {
  return (
    <Link href="/">
      <a className={styles.link}>
        <img
          src="https://avatars2.githubusercontent.com/u/46969484?s=460&u=a95c5e9e5c678fc659573b6b3aef3fb8450d00a7&v=4"
          alt=""
          width="35"
          height="35"
          className={styles.logo}
        />

        <span className="visually-hidden">Profil użytkownika: Olaf Sulich</span>
      </a>
    </Link>
  );
};
