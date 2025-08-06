import styles from './page.module.css'
import Link from 'next/link';

// COMPONENTS
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from '@/components/Navbar/Navbar';
import ProductGrid from '@/components/ProductGrid/ProductGrid';

export default function Home() {
  return (
    <>
      <main className={styles.home}>
        <Navbar />

        {/* <div className={styles.shopHero}>
          <img
            src="/temp-hero-img.png"
            className={styles.heroImage}
            alt="Hero"
          />

          <div className={styles.heroText}>
            <h2>SCIENCE MERCH SHOP</h2>
            <p>UBC SCIENCE UNDERGRADUATE SOCIETY</p>
          </div>
        </div> */}

        <div className={styles.container}>
          <section className={styles.hero}>
            <div className={styles.overlay}>
              <h1>UBC Science Merch</h1>
              <p>Science Undergraduate Society – UBC, Vancouver</p>
            </div>
          </section>

          <section className={styles.categories}>
            <Link href="/hoodies">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/hoodies/hoodie-banner.png" alt="Hoodies" />
                <h2>Hoodies</h2>
              </div>
            </Link>

            <Link href="/crewnecks">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/crewnecks/crew-banner.png" alt="Crewnecks" />
                {/* <h2>Crewnecks</h2> */}
              </div>
            </Link>

            <Link href="/shorts">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/shorts/shorts-banner.png" alt="Shorts" />
                {/* <h2>Shorts</h2> */}
              </div>
            </Link>

          </section>
        </div>

        <Link href="/shop">
          <button className={styles.shopButton}>Browse the Shop</button>
        </Link>
      </main>

      <Footer></Footer>
    </>
  );
}
