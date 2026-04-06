'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/CartContext'
import styles from './CartSummary.module.css'

export default function CartSummary() {
  const router = useRouter()
  const { cartSubtotal, isCartEmpty } = useCart()

  return (
    <div className={styles.cartSummary}>
      <h1>Summary</h1>
      <hr />
      <div className={styles.amount}>
        <p>Subtotal</p>
        <p>${cartSubtotal.toFixed(2)}</p>
      </div>
      {/* Discount code
      <br />
      <div className={styles.amount}>
        <p>Discount</p>
        <p>-${10}</p>
      </div>
      <hr />
      <p>Discount Code</p>
      <input type="text" required />
      <div className={styles.discountApplied}>
        <div className={styles.checkmark}>
          <div className={styles.bar} />
          <div className={styles.bar} />
        </div>
        Discount applied
      </div> */}
      <hr />
      <div className={styles.amount}>
        <b>Total</b>
        <b>${cartSubtotal.toFixed(2)}</b>
      </div>
      <br />
      <button
        className={`btn-primary ${isCartEmpty ? 'disabled' : ''}`}
        disabled={isCartEmpty}
        onClick={() => router.push('/checkout')}
      >
        Checkout
      </button>
    </div>
  )
}
