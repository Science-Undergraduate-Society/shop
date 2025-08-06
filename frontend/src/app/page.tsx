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

        <div className={styles.container}>
          <section className={styles.hero}>
            <div className={styles.overlay}>
              <h1>UBC Science Merch</h1>
              <p>Science Undergraduate Society – UBC, Vancouver</p>
            </div>
          </section>

          <section>
            <p className={styles.pickupInfo}>
              📦 <strong>IMPORTANT - Pickup Information:</strong> All summer 2025 orders must be picked up at Abdul Ladha Science Student Centre, Vancouver, BC V6T 1Z1 on <span>August 11 between 11:00 AM – 1:00 PM</span> or on <span>Imagine Day – September 2, 2025</span>. Please bring your Square confirmation email when picking up your order!
            </p>
          </section>

          <section className={styles.categories}>
            <Link href="/hoodies">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/hoodies/hoodie-banner.png" alt="Hoodies" />
                <h2>Shop Hoodies</h2>
              </div>
            </Link>

            <Link href="/crewnecks">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/crewnecks/crew-banner.png" alt="Crewnecks" />
                <h2>Shop Crewnecks</h2>
              </div>
            </Link>

            <Link href="/shorts">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/shorts/shorts-banner.png" alt="Shorts" />
                <h2>Shop Shorts</h2>
              </div>
            </Link>

          </section>
        </div>
      </main>

      <Footer></Footer>
    </>
  );
}
