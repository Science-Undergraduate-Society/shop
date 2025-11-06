"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../order-confirmed/orderConfirmed.module.css";
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";

export default function ThankYouPage() {
    const [orderId, setOrderId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderId.trim()) {
        window.location.href = `/order-confirmed?order=${orderId.trim()}`;
        }
    };

    return (
        <div className={styles.pageWrapper}>
        <Navbar />
        <div className={styles.container}>
            <div className={styles.verificationBox}>
            <h1>🎉 Thank You for Your Purchase!</h1>
            
            <div className={styles.verificationSection}>
                <h2>Schedule Your Pickup</h2>
                <p>Enter your Order ID from your confirmation email to book your pickup time:</p>
                
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
                <button 
                    type="submit"
                    className={styles.button}
                    disabled={!orderId.trim()}
                >
                    Schedule Pickup
                </button>
                </form>

                <p className={styles.helperText}>
                Check your email for your Order ID
                </p>
            </div>

            <div className={styles.locationInfo} style={{ marginTop: '32px' }}>
                <h3>📍 Pickup Location</h3>
                <p><strong>SUS Office</strong></p>
                <p>AMS Nest Building, 2nd Floor</p>
                <p>6133 University Blvd, Vancouver, BC</p>
                <p className={styles.hours}>Hours: Monday-Friday, 11am-3pm</p>
            </div>

            <Link href="/">
                <button className={styles.button} style={{ marginTop: '24px' }}>
                Back to Shop
                </button>
            </Link>
            </div>
        </div>
        <Footer />
        </div>
    );
}
