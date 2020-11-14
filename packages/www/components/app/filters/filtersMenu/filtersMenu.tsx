import { memo } from 'react';
import styles from './filtersMenu.module.scss';

type FiltersMenuProps = {
  isActive: boolean;
};

const FiltersMenu = memo<FiltersMenuProps>(({ isActive }) => {
  return (
    <>
      {isActive ? (
        <div className={styles.container}>
          <section className={styles.wrapper}>
            <h2 id="technology-filters" className={styles.heading}>
              Technologie
            </h2>
            <ul aria-labelledby="technology-filters" className={styles.list}>
              <li className={styles.listItem}>
                <button className={styles.button}>JavaScript</button>
              </li>
              <li className={styles.listItem}>
                <button className={styles.button}>TypeScript</button>
              </li>
              <li className={styles.listItem}>
                <button className={styles.button}>React</button>
              </li>
              <li className={styles.listItem}>
                <button className={styles.button}>Vue</button>
              </li>
            </ul>
          </section>
          <section className={styles.wrapper}>
            <h2 id="technology-filters" className={styles.heading}>
              Sortuj
            </h2>
            <ul aria-labelledby="technology-filters" className={styles.list}>
              <li className={styles.listItem}>
                <button className={styles.button}>od najnowszych</button>
              </li>
              <li className={styles.listItem}>
                <button className={styles.button}>od najpopularniejszych</button>
              </li>
              <li className={styles.listItem}>
                <button className={styles.button}>od najstarszych</button>
              </li>
              <li className={styles.listItem}>
                <button className={styles.button}>od najmniej popularnych</button>
              </li>
            </ul>
          </section>
        </div>
      ) : null}
    </>
  );
});

export default FiltersMenu;
