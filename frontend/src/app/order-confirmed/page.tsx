'use client'

import { useEffect } from 'react'
import { useCart } from '@/lib/CartContext'
import OrderDetails from '@/components/OrderDetails/OrderDetails'
import OrderSummary from '@/components/OrderSummary/OrderSummary'
import styles from './orderConfirmed.module.css'

export default function OrderConfirmed() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className={styles.orderConfirmed}>
      <div className={styles.banner}>
        <img src="/icons/confirmed.svg" alt="Order Confirmed" draggable="false" />
        <h1>Order Confirmed!</h1>
        <h2>Thank you for your purchase</h2>
      </div>
      <div className={styles.overview}>
        <OrderDetails />
        <OrderSummary />
      </div>
    </div>
  )
}
