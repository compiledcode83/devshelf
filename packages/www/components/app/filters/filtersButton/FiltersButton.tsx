import styles from './filtersButton.module.scss';
import ArrowIcon from '../../../../public/icons/arrow-down.svg';

type FiltersButtonProps = {
  label: string;
};

const FiltersButton = ({ label }: FiltersButtonProps) => {
  return (
    <button className={styles.button}>
      <span className={styles.filter}>{label}</span>
      <span className={styles.icon}>
        <ArrowIcon />
      </span>
    </button>
  );
};

export default FiltersButton;
