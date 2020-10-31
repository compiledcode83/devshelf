import styles from './header.module.scss';
import Submenu from 'components/header/submenu/Submenu';
import Logo from 'components/header/logo/Logo';
import Navigation from 'components/header/navigation/Navigation';
import HamburgerButton from './hamburgerButton/HamburgerButton';
import useToggle from 'shared/hooks/useToggle';

const Header = () => {
  const { on: isVisible, toggle } = useToggle();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <HamburgerButton isVisible={isVisible} handleToggleMenu={toggle} />
      </div>
      {isVisible ? <Navigation /> : null}
      <Submenu />
    </header>
  );
};

export default Header;
