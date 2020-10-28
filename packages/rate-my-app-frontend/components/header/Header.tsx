import Logo from '../../public/icons/logo.svg';
import styles from './header.module.scss';
import { useState } from 'react';
import cn from 'classnames';

const Header = () => {
  const [isVisible, setVisibility] = useState(false);
  const handleToggleMenu = () => {
    setVisibility((prevState) => !prevState);
  };
  return (
    <header className={styles.container}>
      <Logo />
      <button
        onClick={handleToggleMenu}
        className={cn(styles.hamburger, {
          [styles.hamburgerOpen]: isVisible,
        })}
      ></button>
    </header>
  );
};

export default Header;
