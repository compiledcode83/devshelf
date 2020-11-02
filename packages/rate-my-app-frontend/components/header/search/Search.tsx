import styles from './search.module.scss';

const Search = () => (
  <div className={styles.wrapper}>
    <form className={styles.form}>
      <label htmlFor="search" className="visually-hidden">
        Szukaj projektów
      </label>
      <input id="search" type="search" placeholder="Szukaj projektów..." className={styles.input} />
    </form>
  </div>
);
export default Search;
