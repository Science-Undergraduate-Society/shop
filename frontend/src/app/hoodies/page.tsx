"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./hoodies.module.css";

import { Footer } from "@/components/Footer/Footer";

export default function Hoodie() {
    const hoodie = {
        name: "Classic UBC Hoodie – Grey",
        price: 55,
        colors: ["Grey", "Black", "Navy"],
        sizes: { S: 2, M: 3, L: 1, XL: 0 },
        images: [
            "/merch_photos/hoodies/grey-hoodie.png",
            "/merch_photos/hoodies/black-hoodie.png",
            "/merch_photos/hoodies/blue-hoodie.png",
        ],
        description: "Premium comfort, campus spirit. Soft fleece hoodie made for every season.",
        squareLink: "https://square.link/u/your-hoodie-purchase-link",
    };

    const [selectedImage, setSelectedImage] = useState(hoodie.images[0]);

    return (
        <div className={styles.pageLayout}>
            <Link href="/" className={styles.backLink}>← Back to Shop</Link>

            <div className={styles.content}>
                {/* Left: Thumbnails + Main Image */}
                <div className={styles.leftPanel}>
                    <div className={styles.thumbnailColumn}>
                        {hoodie.images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Hoodie ${index}`}
                                className={`${styles.thumbnail} ${selectedImage === src ? styles.active : ""}`}
                                onClick={() => setSelectedImage(src)}
                            />
                        ))}
                    </div>
                    <div className={styles.mainImage}>
                        <img src={selectedImage} alt="Main Hoodie" />
                    </div>
                </div>

                {/* Right: Info */}
                <div className={styles.rightPanel}>
                    <h1 className={styles.name}>{hoodie.name}</h1>
                    <p className={styles.price}>${hoodie.price}.00 CAD</p>

                    <div className={styles.textGroup}>
                        <strong>Available Sizes:</strong>
                        <ul>
                            {Object.entries(hoodie.sizes).map(([size, qty]) => (
                                <li key={size}>
                                    {size} — {qty > 0 ? "In Stock" : "Sold Out"}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.textGroup}>
                        <strong>Available Colors:</strong>
                        <ul>
                            {hoodie.colors.map((color) => (
                                <li key={color}>{color}</li>
                            ))}
                        </ul>
                    </div>

                    <a href={hoodie.squareLink} target="_blank" rel="noopener noreferrer">
                        <button className={styles.buyBtn}>Buy Now</button>
                    </a>

                    <p className={styles.taxes}>✅ Taxes Included</p>
                    <p className={styles.description}>{hoodie.description}</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
