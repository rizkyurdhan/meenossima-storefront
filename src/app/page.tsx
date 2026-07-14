import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import buttonStyles from "@/components/ui/Button/Button.module.css";
import { Button } from "@/components/ui/Button/Button";
import { ProductCard } from "@/components/product/ProductCard/ProductCard";
import { getFeaturedProducts } from "@/data/mockData";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <section className={styles.hero}>
        <Image
          src="https://images.unsplash.com/photo-1593111160232-b7112c81e7e3?auto=format&fit=crop&q=80&w=2000"
          alt="Meenossima Collection"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>The Art of Being</h1>
          <p className={styles.heroSubtitle}>
            Curated essentials for a deliberate lifestyle. Thoughtfully designed, ethically crafted.
          </p>
          <Link href="/products" className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.lg}`}>
            Shop the Collection
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Arrivals</h2>
          <Link href="/products" className={styles.viewAll}>
            View All
          </Link>
        </div>
        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </>
  );
}
