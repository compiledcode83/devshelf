import { useCallback } from 'react';
import Head from 'next/head';
import PrivacyPolicyModal from 'components/modals/privacyPolicyModal/PrivacyPolicyModal';
import useLocalStorage from 'shared/hooks/useLocalStorage';
import Header from 'components/header/Header';

const Home = () => {
  const [storedValue, setValue] = useLocalStorage('cookie_policy');

  const handleAcceptPolicy = useCallback(() => {
    setValue('accepted');
  }, [setValue]);

  return (
    <>
      {storedValue !== 'accepted' ? <PrivacyPolicyModal onAccept={handleAcceptPolicy} /> : null}
      <Header />
    </>
  );
};

export default Home;
