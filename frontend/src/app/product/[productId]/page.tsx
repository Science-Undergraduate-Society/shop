import { getProducts } from '@/lib/getProducts'
import Notice from '@/components/Notice/Notice'
import ProductView from '@/components/ProductView/ProductView'
import ProductCarousel from '@/components/ProductCarousel/ProductCarousel'
import styles from './product.module.css'

export default async function Product({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params
  const products = await getProducts()
  const product = products.find(product => product.id === productId)

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

  return (
    <main className={styles.product}>
      <div>
        <Notice />
        <p className={styles.breadcrumb}>{breadcrumb}</p>
        <ProductView product={product} />
        <h2 className={styles.viewMoreMerch}>View More Merch</h2>
      </div>
      <ProductCarousel productId={productId} />
    </main>
  )
}
