import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard/ProductCard'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.banner}>
          <img src="/banner.svg" alt="Shop Banner" draggable="false" />
          {/* <img src="/banner-cameos.png" alt="Cameos" draggable="false" /> */}
        </div>
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
    </>
  )
}
