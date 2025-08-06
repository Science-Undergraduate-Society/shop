"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./crewnecks.module.css";

import { Footer } from "@/components/Footer/Footer";

export default function Crewneck() {
    const crewneck = {
        name: "Classic Science UBC Crewnecks",
        price: 55,
        colors: ["Grey", "White", "Sand", "Black", "Light Blue", "Retro Blue", "Pink"],
        sizes: { S: 100, M: 100, L: 100, XL: 100 },
        images: [
            "/merch_photos/crewnecks/grey-crew.png",
            "/merch_photos/crewnecks/black-crew.png",
            "/merch_photos/crewnecks/blue-crew.png",
            "/merch_photos/crewnecks/pink-crew.jpg",
            "/merch_photos/crewnecks/sand-crew.png"
        ],
        squareLink: "https://square.link/u/bh22jGIn",
    };

    const [selectedImage, setSelectedImage] = useState(crewneck.images[0]);

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
                    {crewneck.images.map((src, index) => (
                        <img
                        key={index}
                        src={src}
                        alt={`crewneck ${index}`}
                        className={`${styles.thumbnail} ${selectedImage === src ? styles.active : ""}`}
                        onClick={() => setSelectedImage(src)}
                        />
                    ))}
                </div>
                    <div className={styles.mainImage}>
                    <img src={selectedImage} alt="Main Crewneck" />
                </div>
            </div>

            {/* Right Panel: Info */}
            <div className={styles.rightPanel}>
                <h1 className={styles.name}>{crewneck.name}</h1>
                <p className={styles.price}>${crewneck.price}.00 CAD</p>

                <div className={styles.textGroup}>
                    <h2>Available Sizes:</h2>
                    <ul>
                        {Object.entries(crewneck.sizes).map(([size, qty]) => (
                        <li key={size}>
                            {size} — {qty > 0 ? "In Stock" : "Sold Out"}
                        </li>
                        ))}
                    </ul>
                    </div>

                    <div className={styles.textGroup}>
                    <h2>Available Colors:</h2>
                    <ul>
                        {crewneck.colors.map((color) => (
                        <li key={color}>{color}</li>
                        ))}
                    </ul>
                    </div>

                    <a href={crewneck.squareLink} target="_blank" rel="noopener noreferrer">
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
