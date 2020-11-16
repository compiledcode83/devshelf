import styles from './filters.module.scss';
import FiltersButton from './filtersButton/FiltersButton';
import FiltersMenu from './filtersMenu/filtersMenu';
import useToggle from 'components/app/shared/utils/useToggle';
import cl from 'classnames';

const Filters = () => {
  const [on, toggle] = useToggle();
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <FiltersButton isActive={on} handleToggleMenu={toggle} />
        <FiltersMenu isActive={on} />
      </div>
    </div>
  );
};

export default Filters;
