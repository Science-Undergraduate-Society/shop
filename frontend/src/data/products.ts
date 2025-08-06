import { Product } from "@/lib/types";

export const products: Product[] = [
    {
        name: "Hoodie",
        type: "hoodie",
        cost: 55,
        image: "/images/hoodies.png",
        variants: [
            { color: "Grey", quantities: { S: 5, M: 2, L: 8, XL: 5 } },
            { color: "White", quantities: { S: 9, M: 7, L: 14, XL: 6 } },
            // ... other hoodie variants
        ],
        squareLinks: {
            "S-Grey": "https://square.link/u/hoodie-s-grey",
            "M-Grey": "https://square.link/u/hoodie-m-grey",
            "L-Grey": "https://square.link/u/hoodie-l-grey",
            "XL-Grey": "https://square.link/u/hoodie-xl-grey",
            "S-White": "https://square.link/u/hoodie-s-white",
            "M-White": "https://square.link/u/hoodie-m-white",
            // TODO Add remaining combinations...
        },
    },
    {
        name: "Crewneck",
        type: "crewneck",
        cost: 45,
        image: "/images/crewnecks.png",
        variants: [
            { color: "Grey", quantities: { S: 3, M: 2, L: 12, XL: 7 } },
            { color: "White", quantities: { S: 4, M: 9, L: 17, XL: 9 } },
        ],
        squareLinks: {
            "S-Grey": "https://square.link/u/crewneck-s-grey",
            "M-Grey": "https://square.link/u/crewneck-m-grey",
            // TODO ...
        },
    },
    {
        name: "Shorts",
        type: "shorts",
        cost: 45,
        image: "/images/shorts.png",
        variants: [
            { color: "Grey", quantities: { S: 25, M: 25, L: 15, XL: 5 } },
        ],
        squareLinks: {
            "S-Grey": "https://square.link/u/shorts-s-grey",
            "M-Grey": "https://square.link/u/shorts-m-grey",
            // TODO ...
        },
    },
];