import React from 'react';
import styles from './privacyPolicyModal.module.scss';
import Link from 'next/link';

const PrivacyPolicyModal = () => {
  return (
    <dialog open className={styles.wrapper}>
      <div className={styles.backdrop}></div>
      <div className={styles.card}>
        <button className={styles.closeButton} aria-label="Close privacy policy information modal">
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={styles.closeButtonIcon}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.707 7.293C12.316 6.902 11.684 6.902 11.293 7.293L10 8.586L8.707 7.293C8.316 6.902 7.684 6.902 7.293 7.293C6.902 7.684 6.902 8.316 7.293 8.707L8.586 10L7.293 11.293C6.902 11.684 6.902 12.316 7.293 12.707C7.488 12.902 7.744 13 8 13C8.256 13 8.512 12.902 8.707 12.707L10 11.414L11.293 12.707C11.488 12.902 11.744 13 12 13C12.256 13 12.512 12.902 12.707 12.707C13.098 12.316 13.098 11.684 12.707 11.293L11.414 10L12.707 8.707C13.098 8.316 13.098 7.684 12.707 7.293ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18ZM10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
            />
          </svg>
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
