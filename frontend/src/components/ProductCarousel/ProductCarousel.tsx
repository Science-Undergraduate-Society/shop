import { products } from '@/data/products'
import { Product } from '@/lib/types'
import ProductCard from '@/components/ProductCard/ProductCard'
import styles from './ProductCarousel.module.css'

export default function ProductCarousel({ product }: { product: Product }) {
  const remainingProducts = products.filter(_product => _product.id !== product.id)
  const productList = [...remainingProducts, ...remainingProducts]

  return (
    <div className={styles.productCarousel}>
      <div className={styles.track}>
        {productList.map((product, index) => (
          <ProductCard
            key={product.id + index}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}
