import Head from 'next/head';
import PrivacyPolicyModal from 'components/modals/privacyPolicyModal/PrivacyPolicyModal';
import Header from 'components/header/Header';

const Home = () => {
  return (
    <>
      <PrivacyPolicyModal />
      <Header />
    </>
  );
};

export default Home;
