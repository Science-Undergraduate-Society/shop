'use client'

import { use, useState } from 'react'
import { products } from '@/data/products'
import { Size, Variant } from '@/lib/types'
import ProductGallery from '@/components/ProductGallery/ProductGallery'
import ProductDetails from '@/components/ProductDetails/ProductDetails'
import ProductCarousel from '@/components/ProductCarousel/ProductCarousel'
import { Notice } from '@/components/Notice/Notice'
import styles from './product.module.css'

const SIZE_GUIDE = '/merch_photos/size_guide.png'
const SIZE_GUIDE_INCLUDE_LIST = [
  'hoodies',
  'crewnecks'
]

export default function Product({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params)
  const product = products.find(product => product.id === productId)

  // Initialize hooks before conditional returns
  const [variant, setVariant] = useState<Variant>(product?.variants[0] || {} as Variant)
  const [image, setImage] = useState<string>(product?.variants[0]?.images[0] || '')
  const [size, setSize] = useState<Size | null>(null)

  if (!product) {
    return (
      <main className={styles.product}>
        <h1>Error: Page Not Found</h1>
      </main>
    )
  }

  const breadcrumb = [
    'Shop',
    ...(product.name !== product.displayName ? [product.name] : []),
    product.displayName
  ].join(' > ')

  const thumbnails = [
    ...variant.images,
    ...(product.type === 'clothing' && SIZE_GUIDE_INCLUDE_LIST.includes(product.id) ? [SIZE_GUIDE] : [])
  ]

  function updateVariant(newVariant: Variant) {
    if (variant === newVariant) {
      return
    }

    setVariant(newVariant)
    setImage(newVariant.images[0])
    setSize(null)
  }

  return (
    <main className={styles.product}>
      <div>
        <div className={styles.breadcrumb}>
          <p>{breadcrumb}</p>
        </div>
        <Notice />
        <div className={styles.overview}>
          <ProductGallery
            image={image}
            thumbnails={thumbnails}
            onSelect={setImage}
          />
          <ProductDetails
            product={product}
            variant={variant}
            size={size}
            onVariantChange={updateVariant}
            onSizeChange={setSize}
          />
        </div>
        <h2 className={styles.viewMoreMerch}>View More Merch</h2>
      </div>
      <ProductCarousel product={product} />
    </main>
  )
}
