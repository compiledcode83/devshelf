import React from 'react';
import styles from './privacyPolicyModal.module.scss';
import Link from 'next/link';
import CloseIcon from '../../../public/icons/close.svg';

const PrivacyPolicyModal = () => {
  return (
    <dialog open className={styles.wrapper}>
      <div className={styles.card}>
        <button className={styles.closeButton} aria-label="Close privacy policy information modal">
          <CloseIcon />
        </button>
        <div className={styles.textContentBox}>
          <p className={styles.textContentBoxText}>
            Korzystając z tej strony akceptujesz naszą
            <Link href="/">
              <a className={styles.textContentBoxLink}>
                politykę prywatności
                <svg
                  className={styles.arrow}
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <g fillRule="evenodd">
                    <path className={styles.arrowLinePath} d="M0 5h7"></path>
                    <path className={styles.arrowTipPath} d="M1 1l4 4-4 4"></path>
                  </g>
                </svg>
              </a>
            </Link>
          </p>
        </div>
      </div>
    </dialog>
  );
};

export default PrivacyPolicyModal;
