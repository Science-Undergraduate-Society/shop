'use client'

import { useState } from 'react'
import type { ClothingEnriched, ClothingVariationEnriched } from '@/lib/types'
import { Colors, Size } from '@/lib/types'
import { useCart } from '@/lib/CartContext'
import styles from './ProductDetails.module.css'

export default function ClothingDetails({
  product,
  variation,
  size,
  onVariationChange,
  onSizeChange
}: {
  product: ClothingEnriched
  variation: ClothingVariationEnriched
  size: Size | null
  onVariationChange: (variation: ClothingVariationEnriched) => void
  onSizeChange: (size: Size) => void
}) {
  const [shake, setShake] = useState<boolean>(false)
  const [addedToCart, setAddedToCart] = useState<boolean>(false)
  const { addToCart } = useCart()

  const price = size
    ? (variation.sizes[size]?.price ?? product.price)
    : product.price

  const stock = size
    ? (variation.sizes[size]?.stock ?? null)
    : null

  const inStock = Object.values(variation.sizes).some(
    size => size.stock === null || size.stock > 0
  )

  const stockLabel =
    stock === null
      ? (inStock ? 'In stock' : 'Out of stock')
      : stock === 0
        ? 'Out of stock'
        : `${stock} in stock`

  const addToCartDisabled = !size || (variation.sizes[size]?.stock ?? null) === 0

  function formatPrice(price: number | null): string {
    return price !== null ? price.toFixed(2) : '—'
  }

  function handleAddToCart() {
    if (addToCartDisabled) {
      if (inStock) {
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }

      return
    }

    const sizeVariation = variation.sizes[size!]

    if (!sizeVariation?.squareId) {
      return
    }

    addToCart({
      squareVariationId: sizeVariation.squareId,
      productId: product.id,
      productName: product.displayName,
      thumbnail: variation.images[0],
      color: variation.color,
      size: size!,
      price: sizeVariation.price ?? product.price ?? 0,
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
        <h2>Select Colour</h2>
        <div className={styles.swatches}>
          {product.variations.map(_variation => {
            const { color } = _variation
            const inStock = Object.values(_variation.sizes).some(
              sizeVariation => sizeVariation.stock === null || sizeVariation.stock > 0
            )

            return (
              <div
                key={color}
                className={`${styles.swatch} ${styles.color} ${color === variation.color ? styles.selected : ''} ${inStock ? '' : styles.outOfStock}`}
                style={{ background: Colors[color] }}
                title={color}
                onClick={() => onVariationChange(_variation)}
              />
            )
          })}
        </div>
      </div>
      <div className={styles.option}>
        <h2>Select Size</h2>
        <div className={styles.swatches}>
          {Object.entries(variation.sizes).map(([_size, sizeVariation]) => {
            const inStock = sizeVariation.stock === null || sizeVariation.stock > 0

            return (
              <div
                key={_size}
                className={`${styles.swatch} ${styles.size} ${_size === size ? styles.selected : ''} ${inStock ? '' : styles.outOfStock} ${shake ? styles.shake : ''}`}
                title={_size}
                onClick={() => inStock && onSizeChange(_size as Size)}
              >
                {_size}
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
