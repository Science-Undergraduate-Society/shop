import CartItems from '@/components/CartItems/CartItems'
import CartSummary from '@/components/CartSummary/CartSummary'
import styles from './cart.module.css'

export default function Cart() {
  return (
    <main className={styles.cart}>
      <h1 className={styles.header}>Shopping Cart</h1>
      <div className={styles.overview}>
        <CartItems />
        <CartSummary />
      </div>
    </main>
  )
}
