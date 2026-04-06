'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ItemSummary from '../ItemSummary/ItemSummary'
import styles from './OrderSummary.module.css'

export default function OrderSummary() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('order')

      if (stored) {
        const order = JSON.parse(stored)
        setEmail(order.email ?? null)
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  return (
    <div className={styles.orderSummary}>
      <div className={styles.order}>
        <h1>Your Order</h1>
        <ItemSummary />
      </div>
      <div className={styles.email}>
        <Image src="/icons/email.svg" alt="Email" width={50} height={50} draggable="false" />
        <p>A confirmation email has been sent to your inbox: </p>
        <b>{email}</b>
      </div>
    </div>
  )
}
