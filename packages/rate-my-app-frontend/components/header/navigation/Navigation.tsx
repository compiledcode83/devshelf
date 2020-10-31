import styles from './navigation.module.scss';
import Search from 'components/header/search/Search';
import Image from 'next/image';
import { useHeaderState } from '../shared/stores/HeaderContext';
import List from './list/List';
import usePageWidth from 'shared/hooks/usePageWidth';
import cn from 'classnames';

const Navigation = () => {
  const { isMenuVisible } = useHeaderState();
  const pageWidth = usePageWidth(0);
  const isNavigationVisible = isMenuVisible || pageWidth > 500;
  return (
    <>
      <nav
        id="navigation"
        aria-label="Menu główne"
        className={cn(styles.nav, { [styles.hide]: isNavigationVisible })}
      >
        <div className={styles.listWrapper}>
          <Search />
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
    </>
  );
};

export default Navigation;
