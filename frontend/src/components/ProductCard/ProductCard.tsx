'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Colors, Product, Variation, ClothingVariation } from '@/lib/types'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }: { product: Product }) {
  const [variation, setVariation] = useState<Variation>(product.variations[0])

  const link = `/product/${product.id}`
  const name = product.name
  const price = variation.price.toFixed(2)
  const thumbnail = product.type === 'clothing' ? variation.images[0] : product.thumbnail

  function preventNavigation(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <Link
      href={link}
      className={styles.productCard}
    >
      <div className={styles.thumbnail}>
        {product.new && <div className={styles.new}>New</div>}
        <Image src={thumbnail} alt={thumbnail} fill draggable="false" />
      </div>
      <h1 className={styles.name}>{name}</h1>
      {product.type === 'clothing' && (
        <div
          className={styles.swatches}
          onClick={(event) => preventNavigation(event)}
        >
          {product.type === 'clothing' && product.variations.map(({ color }) => (
            <div
              key={color}
              className={`${styles.swatch} ${color === (variation as ClothingVariation).color ? styles.selected : ''}`}
              style={{ background: Colors[color] }}
              title={color}
              onClick={() => setVariation(product.variations.find(variation => variation.color === color)!)}
            />
          ))}
        </div>
      )}
      <p className={styles.price}>${price} CAD</p>
    </Link>
  )
}
