import styles from './header.module.scss';
import { useState } from 'react';
import cn from 'classnames';
import Search from 'components/header/search/Search';
import Submenu from 'components/header/submenu/Submenu';
import Logo from 'components/header/logo/Logo';
import Navigation from 'components/header/navigation/Navigation';

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
          aria-haspopup="true"
          aria-controls="navigation"
          aria-expanded={isVisible}
          onClick={handleToggleMenu}
          className={cn(styles.hamburger, {
            [styles.hamburgerOpen]: isVisible,
          })}
        >
          <span className="visually-hidden">{isVisible ? 'Otwórz' : 'Zamknij'} menu</span>
        </button>
      </div>
      {isVisible ? <Navigation /> : null}
      <Submenu />
      <Search />
    </header>
  );
};

Header.displayName = 'MyPage';

export default Header;
