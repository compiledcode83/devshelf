import styles from './header.module.scss';
import { useState } from 'react';
import cn from 'classnames';
import Search from 'components/header/search/Search';
import Navigation from 'components/header/navigation/Navigation';
import Logo from 'components/header/logo/Logo';

const Header = () => {
  const [isVisible, setVisibility] = useState(false);
  const handleToggleMenu = () => {
    setVisibility((prevState) => !prevState);
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
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
