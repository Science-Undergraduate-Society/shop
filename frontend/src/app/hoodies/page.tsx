"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./hoodies.module.css";

import { Footer } from "@/components/Footer/Footer";

export default function Hoodie() {
    const hoodie = {
        name: "Classic Science UBC Hoodie",
        price: 55,
        colors: ["Grey", "White", "Sand", "Black", "Retro Blue", "Pink"],
        sizes: { S: 100, M: 100, L: 100, XL: 100 },
        images: [
            "/merch_photos/hoodies/grey-hoodie.png",
            "/merch_photos/hoodies/black-hoodie.png",
            "/merch_photos/hoodies/blue-hoodie.png",
            "/merch_photos/hoodies/pink-hoodie.jpg",
            "/merch_photos/hoodies/sand-hoodie.png",
            "/merch_photos/hoodies/white-hoodie.png",
        ],
        squareLink: "https://square.link/u/PwQ45xMw",
    };

    const [selectedImage, setSelectedImage] = useState(hoodie.images[0]);

    return (
        <div className={styles.pageWrapper}>
        <nav className={styles.navbar}>
            <Link href="/" className={styles.backLink}>← Back to Shop</Link>
        </nav>

        <div className={styles.pageLayout}>
            <div className={styles.content}>
            {/* Left Panel: Thumbnails + Main Image */}
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

            {/* Right Panel: Info */}
            <div className={styles.rightPanel}>
                <h1 className={styles.name}>{hoodie.name}</h1>
                <p className={styles.price}>${hoodie.price}.00 CAD</p>

                <div className={styles.textGroup}>
                    <h2>Available Sizes:</h2>
                    <ul>
                        {Object.entries(hoodie.sizes).map(([size, qty]) => (
                        <li key={size}>
                            {size} — {qty > 0 ? "In Stock" : "Sold Out"}
                        </li>
                        ))}
                    </ul>
                    </div>

                    <div className={styles.textGroup}>
                    <h2>Available Colors:</h2>
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
                </div>
            </div>
        </div>

        <div className={styles.footer_container}>

        </div>
        <Footer />
        </div>
    );
}