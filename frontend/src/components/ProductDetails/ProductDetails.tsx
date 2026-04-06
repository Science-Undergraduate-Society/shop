'use client'

import { useState } from 'react'
import { Colors, Size, Product, Variation, ClothingVariation, AccessoryVariation } from '@/lib/types'
import { isStorePaused } from '@/lib/storeStatus'
import styles from './ProductDetails.module.css'

export default function ProductDetails({
  product,
  variation,
  size,
  onVariationChange,
  onSizeChange
}: {
  product: Product
  variation: Variation
  size: Size | null
  onVariationChange: (variation: Variation) => void
  onSizeChange: (size: Size) => void
}) {
  const [shake, setShake] = useState<boolean>(false)
  const storePaused = isStorePaused()

  const name = product.displayName
  const price = variation.price.toFixed(2)
  const addToCartDisabled =
    storePaused ||
    product.type === 'clothing' && (!variation || !size) ||
    product.type === 'accessory' && !(variation as AccessoryVariation).inStock

  function handleAddToCard() {
    if (addToCartDisabled) {
      if (storePaused) {
        return
      }

      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    const squareLink = product.squareLink

    if (squareLink) {
      window.open(squareLink, '_blank')
    }
  }

  return (
    <div className={styles.productDetails}>
      <div className={styles.header}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.price}>${price} CAD <b className={styles.tax}>(tax included)</b></p>
        {/* <p className={styles.stock}>_ in stock</p> */}
      </div>
      {product.type === 'clothing' && (
        <>
          <div className={styles.option}>
            <h2>Select Colour</h2>
            <div className={styles.swatches}>
              {product.variations.map(_variation => {
                const { color } = _variation

                return (
                  <div
                    key={color}
                    className={`${styles.swatch} ${styles.color} ${color === (variation as ClothingVariation).color ? styles.selected : ''}`}
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
              {Object.entries((variation as ClothingVariation).sizes).map(([_size, inStock]) => (
                <div
                  key={_size}
                  className={`${styles.swatch} ${styles.size} ${_size === size ? styles.selected : ''} ${inStock ? '' : styles.outOfStock} ${shake ? styles.shake : ''}`}
                  title={_size}
                  onClick={() => inStock && onSizeChange(_size as Size)}
                >
                  {_size}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {product.type === 'accessory' && (
        <div className={styles.option}>
          <h2>Select Design</h2>
          <div className={styles.swatches}>
            {product.variations.map(_variation => {
              const { name, price, inStock } = _variation

              return (
                <div
                  key={name}
                  className={`${styles.swatch} ${styles.design} ${name === (variation as AccessoryVariation).name ? styles.selected : ''} ${inStock ? '' : styles.outOfStock}`}
                  onClick={() => onVariationChange(_variation)}
                >
                  <p className={styles.name}>{name}</p>
                  <p className={styles.price}>${price.toFixed(2)}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
      <button
        className={`${styles.addToCart} ${addToCartDisabled ? styles.disabled : ''}`}
        onClick={handleAddToCard}
      >
        {storePaused ? 'Temporarily Closed' : 'Buy'}
      </button>
      {storePaused && (
        <p className={styles.purchasePauseNotice}>
          Purchases are unavailable right now while our merch store transitions for Summer 2026.
        </p>
      )}
    </div>
  )
}
