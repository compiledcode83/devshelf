import styles from './search.module.scss';

const Search = () => (
  <form className={styles.form}>
    <label htmlFor="search" className="visually-hidden">
      Szukaj projektów
    </label>
    <input id="search" type="search" placeholder="Szukaj projektów..." className={styles.input} />
  </form>
);
export default Search;
