import React from 'react';
import Link from 'next/link';
import styles from './navigation.module.scss';

const Navigation = () => (
  <nav className={styles.wrapper}>
    <div>
      <input placeholder="Szukaj projektów" />
      <Link href="/">
        <a>Jak korzystać</a>
      </Link>
      <Link href="/">
        <a>Twoje projekty</a>
      </Link>
    </div>
    <button>Profil</button>
  </nav>
);

export default Navigation;
