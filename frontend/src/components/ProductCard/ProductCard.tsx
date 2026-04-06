'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type {
  ProductEnriched,
  VariationEnriched,
  ClothingEnriched,
  ClothingVariationEnriched,
  AccessoryVariationEnriched
} from '@/lib/types'
import { Colors } from '@/lib/types'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }: { product: ProductEnriched }) {
  const [variation, setVariation] = useState<VariationEnriched>(product.variations[0])

  const link = `/product/${product.id}`
  const name = product.name
  const price = getPrice(product, variation)
  const thumbnail = product.type === 'clothing' ? variation.images[0] : product.thumbnail

  function getPrice(product: ProductEnriched, variation: VariationEnriched): string {
    let price: number | null

    if (product.type === 'clothing') {
      price = (product as ClothingEnriched).price
    } else {
      price = (variation as AccessoryVariationEnriched).price
    }

    return price !== null ? price.toFixed(2) : '—'
  }

  function preventNavigation(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <Link href={link} className={styles.productCard}>
      <div className={styles.thumbnail}>
        {product.new && <div className={styles.new}>New</div>}
        <Image src={thumbnail} alt={thumbnail} fill draggable="false" />
      </div>
      <h1 className={styles.name}>{name}</h1>
      {product.type === 'clothing' && (
        <div
          className={styles.swatches}
          onClick={preventNavigation}
        >
          {(product.variations as ClothingVariationEnriched[]).map(({ color }) => (
            <div
              key={color}
              className={`${styles.swatch} ${color === (variation as ClothingVariationEnriched).color ? styles.selected : ''}`}
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
