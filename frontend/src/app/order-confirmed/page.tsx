'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/CartContext'
import OrderDetails from '@/components/OrderDetails/OrderDetails'
import OrderSummary from '@/components/OrderSummary/OrderSummary'
import styles from './orderConfirmed.module.css'

export default function OrderConfirmed() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className={styles.orderConfirmed}>
      <div className={styles.banner}>
        <Image src="/icons/confirmed.svg" alt="Order Confirmed" width={75} height={75} draggable="false" />
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
