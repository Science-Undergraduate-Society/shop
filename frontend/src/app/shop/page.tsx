// app/shop/page.tsx

import { products } from "@/data/products"
import ProductCard from "@/components/ProductCard"

export default function ShopPage() {
    return (
        <main>
        <h1>Our Products</h1>
        <div>
            {products.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
        </main>
    )
}
