"use client";

import Link from "next/link";
import styles from "./orderConfirmed.module.css";
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";

export default function OrderConfirmedPage() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.bookingBox}>
          <h1>✅ Order Confirmed!</h1>
          <p className={styles.subtitle}>Thank you for your purchase from UBC Science Merch!</p>
          
          <div className={styles.pickupSection}>
            <h2>Schedule Your Pickup</h2>
            <p className={styles.subtitle}>Click the button below to book your pickup time with our team</p>

            <div className={styles.locationInfo}>
              <h3>📍 Pickup Location</h3>
              <p><strong>SUS Office</strong></p>
              <p>Abdul Ladha Science Student Centre, </p>
              <p>Vancouver, BC V6T 1Z1</p>
              <p className={styles.pickupLocationSub}>Please ask Carmen Choo at the front desk!</p>
              <p className={styles.hours}>Hours: Wednesdays, 5pm-7pm</p>
            </div>

            <a 
              href="https://calendly.com/vpcommunications-sus/carmen-choo-office-hours" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.buttonLink}
            >
              <button className={styles.button}>
                📅 Book Pickup Time on Calendly
              </button>
            </a>

            <p className={styles.helperText}>
              You will be redirected to Calendly to select your preferred pickup time
            </p>

            <div className={styles.reminderBox}>
              <h3>💡 What to Bring</h3>
              <p>• Order confirmation email</p>
              <p>• Student ID</p>
              <p>• Payment receipt (from Square)</p>
            </div>

            <Link href="/">
              <button className={styles.button} style={{ marginTop: '24px', backgroundColor: '#666' }}>
                Back to Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
