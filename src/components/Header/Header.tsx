import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    (<header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          Poliklinik Sehat Aja
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">
              Ticket
            </Link>
          </li>
          <li>
            <Link href="/register">
              Registration
            </Link>
          </li>
        </ul>
      </nav>
    </header>)
  );
};

export default Header;