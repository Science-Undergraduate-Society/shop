import styles from './Notice.module.css'
import { isStorePaused, TRANSITION_PERIOD_LABEL } from '@/lib/storeStatus'

export default function Notice() {
  const storePaused = isStorePaused()

  if (storePaused) {
    return (
      <div className={styles.container}>
        <p className={styles.transitionInfo}>
          <strong>STORE TEMPORARILY CLOSED:</strong> Our merch store is paused for a transition period during <strong>{TRANSITION_PERIOD_LABEL}</strong>.
          <br /><br />
          Browsing is still available, but checkout is currently disabled and no orders can be placed.
          <br /><br />
          Questions? Contact <a href="mailto:sales@sus.ubc.ca">sales@sus.ubc.ca</a>.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <p className={styles.pickupInfo}>
        ‼️ <strong>ALL ITEMS FINAL SALE:</strong> Exchanges are only permitted at time of pick up.
        <br /><br />
        📦 <strong>IN-PERSON PICKUP ONLY:</strong> All orders must be picked up in person at <strong>Ladha Science Student Centre</strong>. There is <strong>NO SHIPPING</strong> available. Please email <a href="mailto:sales@sus.ubc.ca">sales@sus.ubc.ca</a> after placing your order to coordinate a pickup time.
      </p>
    </div>
  )
}