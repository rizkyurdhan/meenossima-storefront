import { mockProducts } from '@/data/mockData';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

export default function ProductsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>All Products</h1>
        <div className={styles.filters}>
          <Button variant="outline" size="sm">All</Button>
          <Button variant="ghost" size="sm">Dresses</Button>
          <Button variant="ghost" size="sm">Tops</Button>
          <Button variant="ghost" size="sm">Bottoms</Button>
          <Button variant="ghost" size="sm">Accessories</Button>
        </div>
      </header>
      
      <div className={styles.grid}>
        {mockProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
