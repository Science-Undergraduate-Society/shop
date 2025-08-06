// app/shop/[slug]/page.tsx

import { products } from "@/data/products"
import { notFound } from "next/navigation"
import { useState } from "react"

export default function ProductPage({ params }: { params: { slug: string } }) {
    const product = products.find((p) => p.slug === params.slug)
    if (!product) return notFound()

    const [size, setSize] = useState("")
    const [color, setColor] = useState("")

    const purchaseLink = size && color ? product.squareLinks[`${size}-${color}`] : null

    return (
        <main>
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} width="300" />

        <div>
            <label>Size:</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">Select</option>
            {product.sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
            ))}
            </select>
        </div>

        <div>
            <label>Color:</label>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">Select</option>
            {product.colors.map((c) => (
                <option key={c} value={c}>{c}</option>
            ))}
            </select>
        </div>

        {purchaseLink ? (
            <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
            <button>Purchase Now</button>
            </a>
        ) : (
            <p>Select size and color to continue.</p>
        )}
        </main>
    )
}
