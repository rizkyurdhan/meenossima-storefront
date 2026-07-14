import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  price: number;
  imageUrl: string;
}

export const ProductCard = ({ id, slug, title, brand = 'MEENOSSIMA', price, imageUrl }: ProductCardProps) => {
  return (
    <Link href={`/products/${slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.info}>
        {brand && <span className={styles.brand}>{brand}</span>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(price)}
        </p>
      </div>
    </Link>
  );
};
