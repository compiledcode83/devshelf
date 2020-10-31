import styles from './header.module.scss';
import Submenu from 'components/header/submenu/Submenu';
import Logo from 'components/header/logo/Logo';
import Navigation from 'components/header/navigation/Navigation';
import HamburgerButton from './hamburgerButton/HamburgerButton';
import { HeaderProvider } from './shared/stores/HeaderContext';

const Header = () => {
  return (
    <HeaderProvider>
      <header className={styles.header}>
        <div className={styles.container}>
          <Logo />
          <HamburgerButton />
        </div>
        <Submenu />
        <Navigation />
      </header>
    </HeaderProvider>
  );
};

export default Header;
