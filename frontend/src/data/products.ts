export interface Product {
    id: string
    name: string
    slug: string
    image: string
    sizes: string[]
    colors: string[]
    squareLinks: Record<string, string> // key: size-color, value: square checkout link
}

export const products: Product[] = [
    {
            id: "hoodie01",
            name: "Logo Hoodie",
            slug: "logo-hoodie",
            image: "/hoodie.jpg",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "White"],
            squareLinks: {
            "S-Black": "https://square.link/checkout/link-for-s-black",
            "M-White": "https://square.link/checkout/link-for-m-white",
        },
    },
]