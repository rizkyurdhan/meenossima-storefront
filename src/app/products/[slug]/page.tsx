import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/mockData';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              priority
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.thumbnails}>
            {product.images.map((img, idx) => (
              <div key={idx} className={styles.thumbnailContainer}>
                <Image
                  src={img}
                  alt={`${product.title} view ${idx + 1}`}
                  fill
                  className={styles.image}
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className={styles.details}>
          <div className={styles.header}>
            <span className={styles.brand}>{product.brand}</span>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.price}>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(product.price)}
            </p>
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Options */}
          {product.variants.color && (
            <div className={styles.options}>
              <span className={styles.optionLabel}>Color</span>
              <div className={styles.buttonGroup}>
                {product.variants.color.map(color => (
                  <Button key={color} variant="outline" size="sm">{color}</Button>
                ))}
              </div>
            </div>
          )}

          {product.variants.size && (
            <div className={styles.options}>
              <span className={styles.optionLabel}>Size</span>
              <div className={styles.buttonGroup}>
                {product.variants.size.map(size => (
                  <Button key={size} variant="outline" size="sm">{size}</Button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <Button variant="primary" size="lg" fullWidth>Add to Bag</Button>
            <Button variant="outline" size="lg" fullWidth>Add to Wishlist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
