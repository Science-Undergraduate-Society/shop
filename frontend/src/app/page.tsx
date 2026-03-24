import { getProducts } from '@/lib/getProducts'
import Notice from '@/components/Notice/Notice'
import ProductCard from '@/components/ProductCard/ProductCard'
import styles from './page.module.css'

export default async function Home() {
  const products = await getProducts()

  return (
    <div className={styles.home}>
      <div className={styles.banner}>
        <img src="/banner.svg" alt="Shop Banner" draggable="false" />
      </div>
      <Notice />
      <h1 className={styles.category}>All Merch</h1>
      <div className={styles.products}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}
