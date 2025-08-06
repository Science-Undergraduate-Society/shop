export interface Variant {
    color: string;
    quantities: Record<string, number>;
}

export interface Product {
    name: string;
    cost: number;
    slug: string;
    image: string;
    variants: Variant[];
    squareLinks: Record<string, string>; // key: "S-Grey", value: Square link
}
