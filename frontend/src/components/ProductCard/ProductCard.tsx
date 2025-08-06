// components/ProductCard.tsx

import Link from "next/link"
import styles from "@/styles/ProductCard.module.css"
import { Product } from "@/data/products"

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className={styles.card}>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <Link href={`/shop/${product.slug}`}>View</Link>
        </div>
    )
}
