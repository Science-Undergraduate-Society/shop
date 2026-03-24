'use client'

import { useState, useEffect } from 'react'
import styles from './OrderDetails.module.css'

interface Order {
  paymentId: string
  email: string
  name: string
  total: number
  cardLast4?: string
}

export default function OrderDetails() {
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('order')

      if (stored) {
        setOrder(JSON.parse(stored))
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  const bookPickupLink = 'https://calendly.com/vpcommunications-sus/carmen-choo-office-hours'

  const total = order?.total ?? 0

  return (
    <div className={styles.orderDetails}>
      <h1>Order Pickup</h1>
      <div>
        <div className={styles.headers}>
          <span>Location</span>
          <span>Address</span>
          <span>Hours</span>
        </div>
        <div className={styles.pickupDetails}>
          <span data-label="Location">ALSSC Front Desk</span>
          <span data-label="Address">Abdul Ladha Science Student Centre, Vancouver, BC V6T 1Z1</span>
          <span data-label="Hours">Wednesday,<br />5:00 PM – 7:00 PM</span>
          <button
            className="btn-primary"
            onClick={() => window.open(bookPickupLink, '_blank', 'noopener, noreferrer')}
          >
            Book Pickup
          </button>
        </div>
        <p className={styles.pickupNote}>‼️ Book a pickup appointment and ask for Carmen Choo at the front desk.</p>
      </div>
      <div className={styles.whatToBring}>
        <h1>What to Bring</h1>
        <ul>
          <li>Order confirmation email</li>
          <li>Student ID</li>
          <li>Payment receipt from Square</li>
        </ul>
      </div>
      <hr />
      <h1>Invoice Details</h1>
      <div className={styles.invoiceDetails}>
        <div className={styles.amount}>
          <p>Subtotal</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <div className={`${styles.amount} ${styles.total}`}>
          <b>Total</b>
          <b>${total.toFixed(2)}</b>
        </div>
      </div>
      <div className={styles.paymentMethod}>
        <img src="/icons/credit-card.svg" alt="Payment Method" draggable="false" />
        {order?.cardLast4
          ? <p>Paid by card ending in {order.cardLast4}</p>
          : <p>Paid by card</p>
        }
      </div>
    </div>
  )
}
