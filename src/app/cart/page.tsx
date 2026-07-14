import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { mockProducts } from '@/data/mockData';
import styles from './page.module.css';

export default function CartPage() {
  // Hardcoded mock cart items for the mockup
  const cartItems = [
    { product: mockProducts[0], quantity: 1, size: 'M' },
    { product: mockProducts[2], quantity: 1, size: 'All Size' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = 50000; // Mock flat rate
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Bag</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Your bag is currently empty.</p>
          <Link href="/products" passHref legacyBehavior>
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.itemsList}>
            {cartItems.map((item, idx) => (
              <div key={idx} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    fill
                    className={styles.image}
                    sizes="100px"
                  />
                </div>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.product.title}</h3>
                  <div className={styles.itemMeta}>
                    <span>Size: {item.size}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>{formatPrice(item.product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button variant="primary" size="lg" fullWidth>Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
