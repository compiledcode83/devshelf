import Card from 'components/app/card/Card';
import Header from 'components/app/header/Header';
import Filters from '../components/app/filters/Filters';
import PopularResources from '../components/app/popularResources/PopularResources';
import styles from './index.module.scss';
const Home = () => {
  return (
    <>
      {/* <PrivacyPolicyModal /> */}
      <Header />
      <main className={styles.container}>
        <div className={styles.mainWrapper}>
          <div className={styles.filters}>
            <Filters />
          </div>
          <section className={styles.projectsWrapper}>
            <h1 className={styles.heading}>STRONA GŁÓWNA</h1>
            <div className={styles.projectsFilters}>
              <Filters />
            </div>
            <Card />
            <Card />
            <Card />
          </section>
          <div className={styles.popularWrapper}>
            <PopularResources />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
