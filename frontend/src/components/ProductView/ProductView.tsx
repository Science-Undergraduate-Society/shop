'use client'

import { useState } from 'react'
import type { ProductEnriched, VariationEnriched } from '@/lib/types'
import { Size } from '@/lib/types'
import ProductGallery from '@/components/ProductGallery/ProductGallery'
import ProductDetails from '@/components/ProductDetails/ProductDetails'
import styles from './ProductView.module.css'

const SIZE_GUIDE = '/merch_photos/size_guide.png'
const SIZE_GUIDE_INCLUDE_LIST = ['hoodies', 'crewnecks']

export default function ProductView({ product }: { product: ProductEnriched }) {
  const firstVariation = product.variations[0] as VariationEnriched

  const [variation, setVariation] = useState<VariationEnriched>(firstVariation)
  const [image, setImage] = useState<string>(firstVariation?.images[0] || '')
  const [size, setSize] = useState<Size | null>(null)

  const thumbnails = [
    ...variation.images,
    ...(product.type === 'clothing' && SIZE_GUIDE_INCLUDE_LIST.includes(product.id) ? [SIZE_GUIDE] : [])
  ]

  function updateVariation(newVariation: VariationEnriched) {
    if (variation === newVariation) {
      return
    }

    setVariation(newVariation)
    setImage(newVariation.images[0])
    setSize(null)
  }

  return (
    <div className={styles.productView}>
      <ProductGallery
        image={image}
        thumbnails={thumbnails}
        onSelect={setImage}
      />
      <ProductDetails
        product={product}
        variation={variation}
        size={size}
        onVariationChange={updateVariation}
        onSizeChange={setSize}
      />
    </div>
  )
}
