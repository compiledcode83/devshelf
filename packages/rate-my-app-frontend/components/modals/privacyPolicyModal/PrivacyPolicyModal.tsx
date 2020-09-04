import React from 'react';
import styles from './privacyPolicyModal.module.scss';

const PrivacyPolicyModal = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <button>close</button>
        <p>Korzystając z tej strony akceptujesz naszą politykę prywatności</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
