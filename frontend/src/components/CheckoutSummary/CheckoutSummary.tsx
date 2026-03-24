'use client'

import { useCart } from '@/lib/CartContext'
import ItemSummary from '../ItemSummary/ItemSummary'
import styles from './CheckoutSummary.module.css'

export default function CheckoutSummary() {
  const { cartSubtotal } = useCart()

  return (
    <div className={styles.checkoutSummary}>
      <h1>Order Summary</h1>
      <ItemSummary />
      <div className={styles.amount}>
        <p>Subtotal</p>
        <p>${cartSubtotal.toFixed(2)}</p>
      </div>
      <div className={styles.amount}>
        <b>Total</b>
        <b>${cartSubtotal.toFixed(2)}</b>
      </div>
    </div>
  )
}
