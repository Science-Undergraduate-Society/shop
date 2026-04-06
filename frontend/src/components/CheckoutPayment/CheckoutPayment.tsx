'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/CartContext'
import styles from './CheckoutPayment.module.css'

interface SquareTokenizeError {
  message: string
}

interface SquareTokenizeResult {
  status: string
  token?: string
  errors?: SquareTokenizeError[]
}

interface SquareCard {
  attach: (selector: string) => Promise<void>
  tokenize: () => Promise<SquareTokenizeResult>
}

interface SquarePayments {
  card: () => Promise<SquareCard>
}

interface SquareSDK {
  payments: (applicationId: string, locationId: string) => SquarePayments
}

declare global {
  interface Window {
    Square?: SquareSDK
  }
}

export default function CheckoutPayment({
  squareEnvironment,
  squareApplicationId,
  squareLocationId
}: {
  squareEnvironment: string
  squareApplicationId: string
  squareLocationId: string
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sdkReady, setSdkReady] = useState(false)

  const router = useRouter()
  const { cartItems, cartSubtotal, isCartEmpty } = useCart()

  const cardRef = useRef<SquareCard | null>(null)

  // Initialize Square Web Payments SDK script
  useEffect(() => {
    const sdkUrl = squareEnvironment === 'production'
      ? 'https://web.squarecdn.com/v1/square.js'
      : 'https://sandbox.web.squarecdn.com/v1/square.js'

    // SDK already fully loaded
    if (window.Square) {
      setSdkReady(true)
      return
    }

    let script = document.querySelector(`script[src="${sdkUrl}"]`) as HTMLScriptElement

    if (!script) {
      script = document.createElement('script')
      script.src = sdkUrl
      script.onerror = () => setError('Failed to load payment SDK. Please refresh and try again.')
      document.head.appendChild(script)
    }

    script.addEventListener('load', () => setSdkReady(true))
  }, [squareEnvironment])

  // Initialize Square card widget once SDK is ready
  useEffect(() => {
    if (!sdkReady || !window.Square || cardRef.current) {
      return
    }

    async function initCard() {
      try {
        const squareSdk = window.Square

        if (!squareSdk) {
          setError('Payment SDK is unavailable. Please refresh and try again.')
          return
        }

        const payments = squareSdk.payments(squareApplicationId, squareLocationId)
        const card = await payments.card()
        await card.attach('#card-container')
        cardRef.current = card
      } catch (error) {
        console.error('Square card init error:', error)
        setError('Failed to initialize card input. Please refresh and try again.')
      }
    }

    initCard()
  }, [sdkReady, squareApplicationId, squareLocationId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!cardRef.current) {
      setError('Card input is not ready yet. Please wait a moment and try again.')
      return
    }

    if (isCartEmpty) {
      setError('Your cart is empty.')
      return
    }

    setLoading(true)

    try {
      // Tokenize the card
      const result = await cardRef.current.tokenize()

      if (result.status !== 'OK' || !result.token) {
        const errorMessages = result.errors?.map((err: { message: string }) => err.message).join(', ')
        setError(errorMessages ?? 'Card tokenization failed. Please check your card details.')
        setLoading(false)
        return
      }

      const sourceId = result.token

      // Send cart items to the API — the server creates the Square Order and pays it
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId, name, email, cartItems }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error ?? 'Payment failed. Please try again.')
        setLoading(false)
        return
      }

      // Store order info for the confirmation page
      // Use the server-calculated total (cents → dollars) so it matches what Square charged
      sessionStorage.setItem('order', JSON.stringify({
        paymentId: data.paymentId,
        orderId: data.orderId,
        email,
        name,
        cartItems,
        total: data.total / 100,
        cardLast4: data.cardLast4,
      }))

      router.push('/order-confirmed')
    } catch (e) {
      console.error('Checkout error:', e)
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className={styles.checkoutPayment}>
      <h1>Payment</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name">Full Name <span className={styles.asterisk}>*</span></label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Abdul Ladha"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email <span className={styles.asterisk}>*</span></label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        {!sdkReady && <p className={styles.hint}>Loading secure card input...</p>}
        <div id="card-container" className={styles.cardContainer} />
        <button
          type="submit"
          className={`btn-primary ${loading || isCartEmpty || !sdkReady ? 'disabled' : ''}`}
          disabled={loading || isCartEmpty || !sdkReady}
        >
          {loading ? 'Loading...' : `Pay $${cartSubtotal.toFixed(2)}`}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
}
