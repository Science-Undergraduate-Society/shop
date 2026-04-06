import { getProducts } from '@/lib/getProducts'
import ProductCard from '@/components/ProductCard/ProductCard'
import styles from './ProductCarousel.module.css'

export default async function ProductCarousel({ productId }: { productId: string }) {
  const products = await getProducts()
  const remainingProducts = products.filter(_product => _product.id !== productId)
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
