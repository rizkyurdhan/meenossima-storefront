import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.column}>
          <h4 className={styles.title}>Shop</h4>
          <Link href="/products" className={styles.link}>All Products</Link>
          <Link href="/products?category=new" className={styles.link}>New Arrivals</Link>
          <Link href="/products?category=bestsellers" className={styles.link}>Bestsellers</Link>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>About</h4>
          <Link href="/about" className={styles.link}>Our Story</Link>
          <Link href="/journal" className={styles.link}>Journal</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>Support</h4>
          <Link href="/faq" className={styles.link}>FAQ</Link>
          <Link href="/shipping" className={styles.link}>Shipping & Returns</Link>
          <Link href="/size-guide" className={styles.link}>Size Guide</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} MEENOSSIMA. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
          <Link href="/terms" className={styles.link}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
