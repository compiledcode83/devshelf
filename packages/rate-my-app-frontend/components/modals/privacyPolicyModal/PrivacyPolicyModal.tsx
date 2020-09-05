import React from 'react';
import styles from './privacyPolicyModal.module.scss';
import Link from 'next/link';
import CloseIcon from '../../../public/icons/close.svg';

const PrivacyPolicyModal = () => {
  return (
    <dialog open className={styles.wrapper}>
      <div className={styles.card}>
        <button className={styles.closeButton}>
          <CloseIcon />
        </button>
        <div className={styles.textContentBox}>
          <p className={styles.textContentBoxText}>
            Korzystając z tej strony akceptujesz naszą
            <Link href="/">
              <a className={styles.textContentBoxLink}>politykę prywatności</a>
            </Link>
          </p>
        </div>
      </div>
    </dialog>
  );
};

export default PrivacyPolicyModal;
