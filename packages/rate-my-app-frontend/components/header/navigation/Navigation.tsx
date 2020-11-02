import styles from './navigation.module.scss';
import Search from 'components/header/search/Search';
import Image from 'next/image';
import { useHeaderState } from '../shared/stores/HeaderContext';
import List from './list/List';
import cn from 'classnames';

const Navigation = () => {
  const { isMenuVisible } = useHeaderState();
  return (
    <>
      <nav
        id="navigation"
        aria-label="Menu główne"
        className={cn(styles.nav, { [styles.hide]: isMenuVisible })}
      >
        <Search />
        <List />
        <div className={styles.userInfo}>
          <img src="/images/user.png" className={styles.userImage} alt="" />
          <p className={styles.userText}>
            <span className="visually-hidden">Profil użytkownika </span>
            Olaf Sulich
          </p>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
