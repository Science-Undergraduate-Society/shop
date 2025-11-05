"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import Link from 'next/link';
import { Product } from '@/lib/types';

// COMPONENTS
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from '@/components/Navbar/Navbar';
import { Notice } from '@/components/Notice/Notice';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (data.success && data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <main className={styles.home}>
        <Navbar />

        <div className={styles.container}>
          <section className={styles.hero}>
            <div className={styles.overlay}>
              <h1>UBC Science Merch</h1>
              <p>Science Undergraduate Society – UBC, Vancouver</p>
            </div>
          </section>

          <Notice />

          <section className={styles.categoriesGrid}>
            {loading ? (
              <div className={styles.loading}>Loading products...</div>
            ) : products.length === 0 ? (
              <div className={styles.noProducts}>No products available at the moment.</div>
            ) : (
              products.map((product) => {
                // Calculate total stock
                const totalStock = product.variants.reduce((sum, v) => sum + v.quantity, 0);
                
                return (
                  <Link key={product.id} href={`/${product.slug}`}>
                    <div className={styles.categoryCard}>
                      <div className={styles.imageWrapper}>
                        <img 
                          src={product.images[0] || '/placeholder.jpg'} 
                          alt={product.name} 
                        />
                        {totalStock === 0 && (
                          <div className={styles.soldOutBadge}>Sold Out</div>
                        )}
                      </div>
                      <div className={styles.info}>
                        <h2>{product.name}</h2>
                        <p className={styles.price}>
                          From ${product.basePrice.toFixed(2)}
                        </p>
                        <p className={styles.stock}>
                          {totalStock > 0 ? `${totalStock} in stock` : 'Out of stock'}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </section>

        </div>
      </main>

      <Footer></Footer>
    </>
  );
}
