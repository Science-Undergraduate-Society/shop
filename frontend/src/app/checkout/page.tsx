import CheckoutPayment from '@/components/CheckoutPayment/CheckoutPayment'
import CheckoutSummary from '@/components/CheckoutSummary/CheckoutSummary'
import styles from './checkout.module.css'

export default function Checkout() {
  const squareEnvironment = process.env.SQUARE_ENVIRONMENT ?? 'sandbox'
  const squareApplicationId = process.env.SQUARE_APPLICATION_ID!
  const squareLocationId = process.env.SQUARE_LOCATION_ID!

  return (
    <main className={styles.checkout}>
      <h1 className={styles.header}>Checkout</h1>
      <div className={styles.overview}>
        <CheckoutPayment
          squareEnvironment={squareEnvironment}
          squareApplicationId={squareApplicationId}
          squareLocationId={squareLocationId}
        />
        <CheckoutSummary />
      </div>
    </main>
  )
}
