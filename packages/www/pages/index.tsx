import Head from 'next/head';
import PrivacyPolicyModal from 'components/app/modals/privacyPolicyModal/PrivacyPolicyModal';
import Header from 'components/app/header/Header';
import Card from 'components/app/card/Card';
import styles from './index.module.scss';
import Filters from '../components/app/filters/Filters';
import PopularResources from '../components/app/popularResources/PopularResources';
const Home = () => {
  return (
    <>
      {/* <PrivacyPolicyModal /> */}
      <Header />
      <main>
        <div className={styles.mainWrapper}>
          <div className={styles.container}>
            <Filters />
            <div className={styles.projectsWrapper}>
              <Card />
              <Card />
              <Card />
            </div>
          </div>
          <div className={styles.popularWrapper}>
            <PopularResources />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
