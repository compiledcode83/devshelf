import styles from './header.module.scss';
import Logo from 'components/header/logo/Logo';
import Navigation from 'components/header/navigation/Navigation';
import HamburgerButton from './hamburgerButton/HamburgerButton';
import { HeaderProvider } from './shared/stores/HeaderContext';

const Header = () => {
  return (
    <HeaderProvider>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.container}>
            <Logo />
            <HamburgerButton />
            <Navigation />
          </div>
        </header>
      </div>
    </HeaderProvider>
  );
};

export default Header;
