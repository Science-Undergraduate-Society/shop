import styles from './page.module.css'
import Link from 'next/link';
import clothes from "../data/products.json"

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

          <section className={styles.categoriesGrid}>
            {clothes.map((item) => (
              <Link key={item.id} href={item.link}>
                <div className={styles.categoryCard}>
                  <div className={styles.imageWrapper}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.info}>
                    <h2>{item.name}</h2>
                    <p className={styles.price}>${item.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </section>

        </div>
      </main>

      <Footer></Footer>
    </>
  );
}
