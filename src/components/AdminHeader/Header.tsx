import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    const data = await response.json();
    if (data.success) {
      router.push('/login');
    } else {
      alert('Failed to logout.');
    }
  };
  
  return (
    (<header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/admin/dashboard">
          Poliklinik Sehat Aja
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="javascript:void(0);" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>)
  );
};

export default Header;