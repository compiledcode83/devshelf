import styles from './filters.module.scss';
import FiltersButton from './filtersButton/FiltersButton';

const Filters = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <FiltersButton label="Sortuj" />
      </div>
      <div className={styles.filters}>
        <FiltersButton label="Technologie" />
      </div>
    </div>
  );
};

export default Filters;
