// components/ProductCard.tsx
import React from "react";
import styles from "./ProductCard.module.css";

type ProductProps = {
    name: string;
    type: "hoodie" | "crewneck" | "shorts";
    color: string;
    price: number;
    image: string;
    quantities: Record<string, number>; // e.g. { S: 2, M: 1 }
    squareLink: string;
};

export const ProductCard: React.FC<ProductProps> = ({
    name,
    color,
    price,
    image,
    quantities,
    squareLink,
    }) => {
    const availableSizes = Object.entries(quantities).filter(
        ([, qty]) => qty > 0
    );

    return (
        <div className={styles.card}>
        <img src={image} alt={`${color} ${name}`} className={styles.image} />
        <div className={styles.info}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.color}>{color}</p>
            <p className={styles.price}>${price}</p>
            <div className={styles.sizes}>
            {availableSizes.map(([size]) => (
                <span key={size} className={styles.size}>
                {size}
                </span>
            ))}
            </div>
            <a
            href={squareLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            >
            Purchase Now
            </a>
        </div>
        </div>
    );
};
