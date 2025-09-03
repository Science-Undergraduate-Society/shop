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
              📦 <strong>IMPORTANT - Pickup Information: </strong>
                Summer orders are now closed! Until further notice, please contact our sales team at <a href="mailto:sales@sus.ubc.ca">sales@sus.ubc.ca</a> to place an order.
            </p>
          </section>

          <section className={styles.categories}>
            <Link href="/letterman">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/letterman/letterman-banner.png" alt="Letterman" />
                <h2>View Letterman Jackets</h2>
              </div>
            </Link>

            <Link href="/quarterZips">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/quarter_zips/quarter-banner.png" alt="Quarter Zips" />
                <h2>View Quarter-Zips</h2>
              </div>
            </Link>

            <Link href="/hoodies">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/hoodies/hoodie-banner.png" alt="Hoodies" />
                <h2>View Hoodies</h2>
              </div>
            </Link>

            <Link href="/crewnecks">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/crewnecks/crew-banner.png" alt="Crewnecks" />
                <h2>View Crewnecks</h2>
              </div>
            </Link>

            <Link href="/shorts">
              <div className={styles.categoryCard}>
                <img src="/merch_photos/shorts/shorts-banner.png" alt="Shorts" />
                <h2>View Shorts</h2>
              </div>
            </Link>

          </section>
        </div>
      </main>

      <Footer></Footer>
    </>
  );
}
