import styles from './navigation.module.scss';
import Search from 'components/header/search/Search';
import Link from 'next/link';
import Image from 'next/image';
import DocumentIcon from '../../../public/icons/document.svg';
import UserIcon from '../../../public/icons/user.svg';
import FlagIcon from '../../../public/icons/flag.svg';
import IdeaIcon from '../../../public/icons/idea.svg';

const Navigation = () => (
  <nav id="navigation" aria-label="Menu główne" className={styles.nav}>
    <div className={styles.listWrapper}>
      <Search />
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="/">
            <a className={styles.link}>
              <DocumentIcon className={styles.icon} />
              Jak korzystać?
            </a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/">
            <a className={styles.link}>
              <UserIcon className={styles.icon} />
              Autorzy
            </a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/">
            <a className={styles.link}>
              <FlagIcon className={styles.icon} />
              Polityka prywatności
            </a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/">
            <a className={styles.link}>
              <IdeaIcon className={styles.icon} />
              Kontrybucja
            </a>
          </Link>
        </li>
      </ul>
    </div>
    <div className={styles.profile}>
      <div className={styles.userInfo}>
        <Image src="/images/user.png" unsized className={styles.userImage} />
        <p className={styles.userText}>
          <span className="visually-hidden">Profil użytkownika</span>
          Olaf Sulich
        </p>
      </div>
    </div>
  </nav>
);

export default Navigation;
