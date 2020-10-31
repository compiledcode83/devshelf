import { memo } from 'react';
import styles from './hamburgerButton.module.scss';
import cn from 'classnames';

type HamburgerButtonProps = {
  isVisible: boolean;
  handleToggleMenu: () => void;
};

const HamburgerButton = memo<HamburgerButtonProps>(({ isVisible, handleToggleMenu }) => {
  return (
    <button
      aria-haspopup="true"
      aria-controls="navigation"
      aria-expanded={isVisible}
      onClick={handleToggleMenu}
      className={cn(styles.hamburger, {
        [styles.hamburgerOpen]: isVisible,
      })}
    >
      <span className="visually-hidden">{isVisible ? 'Zamknij' : 'Otwórz'} menu</span>
    </button>
  );
});

export default HamburgerButton;
