import styles from './page.module.css'
import Link from 'next/link';
import products from "../data/products.json"

// COMPONENTS
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from '@/components/Navbar/Navbar';
import { Notice } from '@/components/Notice/Notice';

export default function Home() {
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

          <section className={styles.merchSection}>
            <h2 className={styles.sectionTitle}>All Merch</h2>
            
            <div className={styles.categoriesGrid}>
              {products.map((item) => {
                // MERCH CATEGORY CARD
                const isNew = ['letterman', 'shorts'].includes(item.id);
                
                return (
                  <Link key={item.id} href={`/product/${item.id}`} className={styles.cardLink}>
                    <div className={styles.categoryCard}>
                      {isNew && (
                        <div className={styles.newBadge}>New</div>
                      )}
                      <div className={styles.imageWrapper}>
                        {item.image ? 
                          <img src={item.image} alt={`Main ${item.fullName}`} /> :
                          <img src={"/temp-hero-img.png"} alt={`Main ${item.fullName}`} />
                        }
                      </div>
                      <div className={styles.info}>
                        <h3>{item.name}</h3>
                        {item.variants && item.variants.length > 1 && (
                          <p className={styles.variantCount}>
                            {item.variants.length} styles
                          </p>
                        )}
                        <p className={styles.price}>
                          From ${Math.min(...item.variants.map(v => v.price)).toFixed(2)} CAD
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      <Footer></Footer>
    </>
  );
}
