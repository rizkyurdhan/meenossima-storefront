import Link from 'next/link';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <button className={styles.iconButton} aria-label="Menu">
        <Menu size={20} />
      </button>

      <nav className={styles.nav}>
        <Link href="/products" className={styles.navLink}>Shop</Link>
        <Link href="/about" className={styles.navLink}>About</Link>
      </nav>

      <Link href="/" className={styles.logo}>
        MEENOSSIMA
      </Link>

      <div className={styles.actions}>
        <button className={styles.iconButton} aria-label="Search">
          <Search size={20} />
        </button>
        <Link href="/cart" className={styles.iconButton} aria-label="Cart">
          <ShoppingBag size={20} />
        </Link>
      </div>
    </header>
  );
};
