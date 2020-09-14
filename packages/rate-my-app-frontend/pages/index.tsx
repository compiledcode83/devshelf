import Head from 'next/head';
import whatInput from 'what-input';
import { useCookies } from 'react-cookie';
import Navigation from '../components/navigation/Navigation';
import PrivacyPolicyModal from '../components/modals/privacyPolicyModal/PrivacyPolicyModal';
import { useCallback } from 'react';

const Home = (): JSX.Element => {
  console.log(whatInput.ask());
  const [cookies, setCookie] = useCookies(['cookie_policy']);

  const handleAcceptPolicy = useCallback(() => {
    setCookie('cookie_policy', 'accepted', {
      path: '/',
    });
  }, [setCookie]);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!cookies['cookie_policy'] ? <PrivacyPolicyModal onAccept={handleAcceptPolicy} /> : null}

      <Navigation />

      <style jsx>
        {`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            background-color: #e7edf3;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
