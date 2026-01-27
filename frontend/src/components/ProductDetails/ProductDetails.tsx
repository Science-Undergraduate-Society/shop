'use client'

import { useState } from 'react'
import { Colors, Size, Product, Variant, ClothingVariant, AccessoryVariant } from '@/lib/types'
import styles from './ProductDetails.module.css'

export default function ProductDetails({
  product,
  variant,
  size,
  onVariantChange,
  onSizeChange
}: {
  product: Product
  variant: Variant
  size: Size | null
  onVariantChange: (variant: any) => void
  onSizeChange: (size: Size) => void
}) {
  const [shake, setShake] = useState<boolean>(false)

  const name = product.displayName
  const price = variant.price.toFixed(2)
  const addToCardDisabled =
    product.type === 'clothing' && (!variant || !size) ||
    product.type === 'accessory' && !(variant as AccessoryVariant).inStock

  function handleAddToCard() {
    if (addToCardDisabled) {
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
              {product.variants.map(_variant => {
                const { color } = _variant

                return (
                  <div
                    key={color}
                    className={`${styles.swatch} ${styles.color} ${color === (variant as ClothingVariant).color ? styles.selected : ''}`}
                    style={{ background: Colors[color] }}
                    title={color}
                    onClick={() => onVariantChange(_variant)}
                  />
                )
              })}
            </div>
          </div>
          <div className={styles.option}>
            <h2>Select Size</h2>
            <div className={styles.swatches}>
              {Object.entries((variant as ClothingVariant).sizes).map(([_size, inStock]) => (
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
            {product.variants.map(_variant => {
              const { name, price, inStock } = _variant

              return (
                <div
                  key={name}
                  className={`${styles.swatch} ${styles.design} ${name === (variant as AccessoryVariant).name ? styles.selected : ''} ${inStock ? '' : styles.outOfStock}`}
                  onClick={() => onVariantChange(_variant)}
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
        className={`${styles.addToCart} ${addToCardDisabled ? styles.disabled : ''}`}
        onClick={handleAddToCard}
      >
        {/* Add To Cart */}
        Buy
      </button>
    </div>
  )
}
