import styles from './Notice.module.css'
import { isStorePaused, TRANSITION_PERIOD_LABEL } from '@/lib/storeStatus'

export default function Notice() {
  const storePaused = isStorePaused()

  if (storePaused) {
    return (
      <div className={styles.container}>
        <p className={styles.transitionInfo}>
          <strong>STORE TEMPORARILY CLOSED:</strong> Purchases are paused while we complete a store transition for <strong>{TRANSITION_PERIOD_LABEL}</strong>.
          <br /><br />
          You can still browse all items, but checkout is disabled so no orders can be placed right now.
          <br /><br />
          We plan to reopen ordering after the transition period. Questions? Contact <a href="mailto:sales@sus.ubc.ca">sales@sus.ubc.ca</a>.
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