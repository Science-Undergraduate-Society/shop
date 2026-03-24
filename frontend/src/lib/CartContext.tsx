'use client'

import { useState, useEffect, useCallback, useContext, createContext  } from 'react'

export interface CartItem {
  id: string // unique key: squareVariationId
  squareVariationId: string
  productId: string
  productName: string
  thumbnail: string
  color?: string
  size?: string
  price: number
  quantity: number
}

interface CartContextValue {
  cartItems: CartItem[]
  cartCount: number
  cartSubtotal: number
  isCartEmpty: boolean
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart')

      if (stored) {
        setCartItems(JSON.parse(stored))
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true)
  }, [])

  // Persist to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems, hydrated])

  const addToCart = useCallback((item: Omit<CartItem, 'id' | 'quantity'>) => {
    const id = item.squareVariationId

    setCartItems(state => {
      const existing = state.find(cartItem => cartItem.id === id)

      if (existing) {
        return state.map(cartItem => cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
      }

      return [...state, { ...item, id, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCartItems(state => state.filter(cartItem => cartItem.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      return
    }

    setCartItems(state => state.map(cartItem => cartItem.id === id ? { ...cartItem, quantity } : cartItem))
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const cartCount = cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0)
  const cartSubtotal = cartItems.reduce((sum, cartItem) => sum + cartItem.price * cartItem.quantity, 0)
  const isCartEmpty = cartCount === 0

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartSubtotal, isCartEmpty, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
