import styles from './navigation.module.scss';
import Search from 'components/header/search/Search';
import Link from 'next/link';
import Image from 'next/image';
import { useHeaderState } from '../shared/stores/HeaderContext';
import DocumentIcon from '../../../public/icons/document.svg';
import UserIcon from '../../../public/icons/user.svg';
import FlagIcon from '../../../public/icons/flag.svg';
import IdeaIcon from '../../../public/icons/idea.svg';
import List from './list/List';

const Navigation = () => {
  const { isMenuVisible } = useHeaderState();
  const i = 'aa';
  return (
    <>
      {i ? (
        <nav id="navigation" aria-label="Menu główne" className={styles.nav}>
          <div className={styles.listWrapper}>
            <Search />
            {/* <List /> */}
          </div>
          <div className={styles.profile}>
            <List />
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
