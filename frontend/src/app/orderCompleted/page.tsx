// app/confirmation/page.tsx
import styles from './orderCompleted.module.css';
import Link from 'next/link';

export default function ConfirmationPage() {
    return (
        <main className={styles.confirmation}>
            <div className={styles.card}>
                <h1>ORDER COMPLETED</h1>
                <p className={styles.note}>
                (Note: this is not a receipt – you will have received an email from Square with your official receipt.)
                </p>

                <h2>📦 IMPORTANT – Pickup Information</h2>
                <p>
                All orders must be picked up on <span>August 11 between 11:00 AM – 1:00 PM</span> or on <span>Imagine Day – September 2, 2025</span>.
                </p>
                <p>
                Pickup location: <strong>Abdul Ladha Science Student Centre, UBC</strong>
                </p>
                <p>
                Please bring your <strong>Square confirmation email</strong> when picking up your order.
                </p>

                <Link href="/" className={styles.homeButton}>
                Go Back to Home
                </Link>
            </div>
        </main>
    );
}
