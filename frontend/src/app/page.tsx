import styles from './page.module.css'
import Link from 'next/link';

// COMPONENTS
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from '@/components/Navbar/Navbar';

export default function Home() {
  return (
    <>
      <main className={styles.home}>
        <Navbar />

        <div className={styles.shopHero}>
          <img
            src="/temp-hero-img.png"
            className={styles.heroImage}
            alt="Hero"
          />

          <div className={styles.heroText}>
            <h2>SCIENCE MERCH SHOP</h2>
            <p>UBC SCIENCE UNDERGRADUATE SOCIETY</p>
          </div>
        </div>

        <Link href="/shop">
          <button className={styles.shopButton}>Browse the Shop</button>
        </Link>
      </main>

      <Footer></Footer>
    </>
  );
}
