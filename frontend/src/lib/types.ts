export type Price = "hoodie" | "crewneck" | "shorts";

export interface Variant {
    color: string;
    quantities: Record<string, number>;
}

export interface Product {
    name: string;
    type: Price;
    cost: number;
    image: string;
    variants: Variant[];
    squareLinks: Record<string, string>; // key: "S-Grey", value: Square link
}
