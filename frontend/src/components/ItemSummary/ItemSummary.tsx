'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CartItem } from '@/lib/CartContext'
import styles from './ItemSummary.module.css'

export default function ItemSummary() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('order')

      if (stored) {
        const order = JSON.parse(stored)
        setCartItems(order.cartItems ?? [])
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  return (
    <div className={styles.itemSummary}>
      {cartItems.map(cartItem => (
        <div key={cartItem.id} className={styles.item}>
          <div className={styles.image}>
            <Image src={cartItem.thumbnail} alt={cartItem.productName} fill draggable="false" />
          </div>
          <div className={styles.details}>
            <h2>{cartItem.productName}</h2>
            {cartItem.color && <p>Colour: {cartItem.color}</p>}
            {cartItem.size && <p>Size: {cartItem.size}</p>}
            {cartItem.size && <p>Quantity: {cartItem.quantity}</p>}
            {cartItem.price && <p className={styles.subtotal}>${(cartItem.price * cartItem.quantity).toFixed(2)}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
