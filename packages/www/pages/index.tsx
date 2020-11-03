import Head from 'next/head';
import PrivacyPolicyModal from 'components/modals/privacyPolicyModal/PrivacyPolicyModal';
import Header from 'components/header/Header';
import Card from 'components/card/Card';
import styles from './index.module.scss';

const Home = () => {
  return (
    <>
      <PrivacyPolicyModal />
      <Header />
      <section className={styles.container}>
        <h1 className={styles.mainHeading}>Strona główna</h1>
        <div className={styles.projectsWrapper}>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div></div>
      </section>
    </>
  );
};

export default Home;
