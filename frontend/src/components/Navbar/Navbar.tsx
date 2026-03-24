'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/CartContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { cartCount } = useCart()

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image src="/sus-logo.svg" alt="SUS Logo" fill draggable="false" />
      </Link>
      <div className={styles.links}>
        <Link href="/">Shop</Link>
        {/* <Link href="/faq">FAQ</Link> */}
        <Link href="https://www.susubc.ca/">SUS Home Page</Link>
        <Link href="/cart" className={styles.cart}>
          <span className={styles.badge}>{cartCount}</span>
          <Image src="/icons/cart.svg" alt="Cart" fill draggable="false" />
        </Link>
      </div>
    </nav>
  )
}
