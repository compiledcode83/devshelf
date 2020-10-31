import styles from './header.module.scss';
import { useState } from 'react';
import cn from 'classnames';
import Search from 'components/header/search/Search';
import Submenu from 'components/header/submenu/Submenu';
import Logo from 'components/header/logo/Logo';
import Navigation from 'components/header/navigation/Navigation';
import HamburgerButton from './hamburgerButton/HamburgerButton';

const Header = () => {
  const [isVisible, setVisibility] = useState(false);

  const handleToggleMenu = () => {
    setVisibility((prevState) => !prevState);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <HamburgerButton isVisible={isVisible} handleToggleMenu={handleToggleMenu} />
      </div>
      {isVisible ? <Navigation /> : null}
      <Submenu />
    </header>
  );
};

Header.displayName = 'MyPage';

export default Header;
