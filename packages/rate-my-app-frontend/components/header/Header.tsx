import styles from './header.module.scss';
import { useState, useCallback } from 'react';
import Submenu from 'components/header/submenu/Submenu';
import Logo from 'components/header/logo/Logo';
import Navigation from 'components/header/navigation/Navigation';
import HamburgerButton from './hamburgerButton/HamburgerButton';

const Header = () => {
  const [isVisible, setVisibility] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setVisibility((prevState) => !prevState);
  }, []);

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

export default Header;
