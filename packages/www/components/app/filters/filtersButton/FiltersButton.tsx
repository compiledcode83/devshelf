import { memo } from 'react';
import styles from './filtersButton.module.scss';
import ArrowIcon from '../../../../public/icons/arrow-down.svg';
import CloseIcon from '../../../../public/icons/closeFilters.svg';

type FiltersButtonProps = {
  isActive: boolean;
  handleToggleMenu: () => void;
};

const FiltersButton = memo<FiltersButtonProps>(({ isActive, handleToggleMenu }) => {
  return (
    <button className={styles.button} onClick={handleToggleMenu}>
      <span className={styles.filter}>Filtruj</span>
      <span className={styles.icon}>{isActive ? <CloseIcon /> : <ArrowIcon />}</span>
    </button>
  );
});

export default FiltersButton;
