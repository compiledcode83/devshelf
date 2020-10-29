import Logo from '../../public/icons/logo.svg';
import styles from './Header.module.scss';
import { useState } from 'react';
import cn from 'classnames';
import Search from 'components/header/search/Search';
import Link from 'next/link';
import Navigation from 'components/header/navigation/Navigation';

const Header = () => {
  const [isVisible, setVisibility] = useState(false);
  const handleToggleMenu = () => {
    setVisibility((prevState) => !prevState);
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <a>
            <Logo aria-hidden="true" />
          </a>
        </Link>
        <button
          onClick={handleToggleMenu}
          className={cn(styles.hamburger, {
            [styles.hamburgerOpen]: isVisible,
          })}
        ></button>
      </div>
      <Navigation />
      <Search />
    </header>
  );
};

Header.displayName = 'MyPage';

export default Header;
