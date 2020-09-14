import React from 'react';
import Link from 'next/link';
import styles from './navigation.module.scss';
import Logo from '../../public/icons/logo.svg';

const Navigation = () => (
  <header className={styles.wrapper}>
    <div>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <form>
        <label htmlFor="search" className="visually-hidden">
          szukaj
        </label>
        <input id="search" placeholder="Szukaj projektów" />
      </form>
    </div>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Jak korzystać</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Twoje projekty</a>
          </Link>
        </li>
      </ul>
      <button>Profil</button>
    </nav>
  </header>
);

export default Navigation;
