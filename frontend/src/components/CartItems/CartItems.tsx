'use client'

import Image from 'next/image'
import { useCart } from '@/lib/CartContext'
import styles from './CartItems.module.css'

export default function CartItems() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  return (
    <div className={styles.cartItems}>
      <div className={styles.headers}>
        <span>Items</span>
        <span>Qty</span>
        <span>Price</span>
        <span></span>
      </div>
      {cartItems.length === 0
        ? <p className={styles.empty}>Your cart is empty</p>
        : cartItems.map(cartItem => (
          <div key={cartItem.id} className={styles.item}>
            <div className={styles.details}>
              <div className={styles.image}>
                <Image src={cartItem.thumbnail} alt={cartItem.productName} fill draggable="false" />
              </div>
              <div>
                <h2>{cartItem.productName}</h2>
                {cartItem.color && <p>Colour: <b>{cartItem.color}</b></p>}
                {cartItem.size && <p>Size: <b>{cartItem.size}</b></p>}
                {cartItem.price && <p>Price: <b>${cartItem.price.toFixed(2)} CAD</b></p>}
              </div>
            </div>
            <div className={styles.quantity}>
              <input
                type="number"
                min="1"
                value={cartItem.quantity}
                onChange={e => {
                  const val = parseInt(e.target.value)
                  if (!isNaN(val) && val >= 1) updateQuantity(cartItem.id, val)
                }}
              />
            </div>
            <div className={styles.subtotal}>
              <p>${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
            </div>
            <div className={styles.remove} onClick={() => removeFromCart(cartItem.id)}>
              <div className={styles.crossmark}>
                <div className={styles.bar} />
                <div className={styles.bar} />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
