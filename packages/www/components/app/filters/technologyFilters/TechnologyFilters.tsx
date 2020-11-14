import styles from './technologyFilters.module.scss';

type TechnologyFiltersProps = {
  isActive: boolean;
};

const TechnologyFilters = ({ isActive }: TechnologyFiltersProps) => {
  return (
    <section className={styles.wrapper}>
      <h2 id="technology-filters" className={styles.heading}>
        Technologie
      </h2>
      <ul aria-labelledby="technology-filters" className={styles.list}>
        <li className={styles.listItem}>
          <button className={styles.button}></button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.button}></button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.button}></button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.button}></button>
        </li>
      </ul>
    </section>
  );
};

export default TechnologyFilters;
