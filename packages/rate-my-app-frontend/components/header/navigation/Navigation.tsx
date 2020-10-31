import styles from './navigation.module.scss';
import Search from 'components/header/search/Search';
import Link from 'next/link';
import Image from 'next/image';
import { useHeaderState } from '../shared/stores/HeaderContext';
import DocumentIcon from '../../../public/icons/document.svg';
import UserIcon from '../../../public/icons/user.svg';
import FlagIcon from '../../../public/icons/flag.svg';
import IdeaIcon from '../../../public/icons/idea.svg';

const Navigation = () => {
  const { isMenuVisible } = useHeaderState();

  return (
    <>
      {isMenuVisible ? (
        <nav id="navigation" aria-label="Menu główne" className={styles.nav}>
          <div className={styles.listWrapper}>
            <Search />
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link href="/">
                  <a className={styles.link}>
                    <DocumentIcon aria-hidden="true" className={styles.icon} />
                    Jak korzystać?
                  </a>
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link href="/">
                  <a className={styles.link}>
                    <UserIcon aria-hidden="true" className={styles.icon} />
                    Autorzy
                  </a>
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link href="/">
                  <a className={styles.link}>
                    <FlagIcon aria-hidden="true" className={styles.icon} />
                    Polityka prywatności
                  </a>
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link href="/">
                  <a className={styles.link}>
                    <IdeaIcon aria-hidden="true" className={styles.icon} />
                    Kontrybucja
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.profile}>
            <div className={styles.userInfo}>
              <Image src="/images/user.png" unsized className={styles.userImage} alt="" />
              <p className={styles.userText}>
                <span className="visually-hidden">Profil użytkownika </span>
                Olaf Sulich
              </p>
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Navigation;
