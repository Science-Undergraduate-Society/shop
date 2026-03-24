'use client'

import { useState } from 'react'
import type { AccessoryEnriched, AccessoryVariationEnriched } from '@/lib/types'
import { useCart } from '@/lib/CartContext'
import styles from './ProductDetails.module.css'

export default function AccessoryDetails({
  product,
  variation,
  onVariationChange
}: {
  product: AccessoryEnriched
  variation: AccessoryVariationEnriched
  onVariationChange: (variation: AccessoryVariationEnriched) => void
}) {
  const [addedToCart, setAddedToCart] = useState<boolean>(false)
  const { addToCart } = useCart()

  const price = variation.price
  const stock = variation.stock

  const stockLabel =
    stock === null ? 'In stock' :
    stock === 0 ? 'Out of stock' :
    `${stock} in stock`

  const addToCartDisabled = stock === 0

  function formatPrice(price: number | null): string {
    return price !== null ? price.toFixed(2) : '—'
  }

  function handleAddToCart() {
    if (addToCartDisabled) {
      return
    }

    if (!variation.squareId) {
      return
    }

    addToCart({
      squareVariationId: variation.squareId,
      productId: product.id,
      productName: product.displayName,
      thumbnail: variation.images[0],
      color: variation.name,
      price: variation.price ?? 0,
    })

    // Brief added feedback
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1500)
  }

  return (
    <div className={styles.productDetails}>
      <div className={styles.header}>
        <h1 className={styles.name}>{product.displayName}</h1>
        <p className={styles.price}>
          ${formatPrice(price)} CAD{' '}
          <b className={styles.tax}>(tax included)</b>
        </p>
        <p className={styles.stock}>
          {stockLabel}
        </p>
      </div>
      <div className={styles.option}>
        <h2>Select Design</h2>
        <div className={styles.swatches}>
          {product.variations.map(_variation => {
            const { name, price } = _variation
            const inStock = _variation.stock === null || _variation.stock > 0

            return (
              <div
                key={name}
                className={`${styles.swatch} ${styles.design} ${name === variation.name ? styles.selected : ''} ${inStock ? '' : styles.outOfStock}`}
                onClick={() => onVariationChange(_variation)}
              >
                <p className={styles.name}>{name}</p>
                <p className={styles.price}>${formatPrice(price)}</p>
              </div>
            )
          })}
        </div>
      </div>
      <button
        className={`${styles.addToCart} ${addToCartDisabled ? styles.disabled : ''} ${addedToCart ? styles.added : ''}`}
        onClick={handleAddToCart}
      >
        {addedToCart ? 'Item Added' : 'Add to Cart'}
      </button>
    </div>
  )
}
