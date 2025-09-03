"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./shorts.module.css";

import { Footer } from "@/components/Footer/Footer";

export default function Shorts() {
    const shorts = {
        name: "Shorts",
        price: 45,
        colors: ["Grey"],
        sizes: { S: 100, M: 100, L: 100, XL: 100 },
        images: [
            "/merch_photos/shorts/shorts-grass.jpeg",
            "/merch_photos/shorts/shorts-f.jpeg",
            "/merch_photos/shorts/shorts-m.jpeg",
            "/merch_photos/shorts/shorts-group.jpeg",
        ],
        squareLink: "https://square.link/u/4Xevv7OY",
    };

    const [selectedImage, setSelectedImage] = useState(shorts.images[0]);

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
                        {shorts.images.map((src, index) => (
                            <img
                            key={index}
                            src={src}
                            alt={`shorts ${index}`}
                            className={`${styles.thumbnail} ${selectedImage === src ? styles.active : ""}`}
                            onClick={() => setSelectedImage(src)}
                            />
                        ))}
                    </div>
                        <div className={styles.mainImage}>
                        <img src={selectedImage} alt="Main Shorts" />
                    </div>
                </div>

                {/* Right Panel: Info */}
                <div className={styles.rightPanel}>
                    <h1 className={styles.name}>{shorts.name}</h1>
                    <p className={styles.price}>${shorts.price}.00 CAD</p>

                    <div className={styles.textGroup}>
                        <h2>Available Sizes:</h2>
                        <ul>
                            {Object.entries(shorts.sizes).map(([size, qty]) => (
                            <li key={size}>
                                {size} — {qty > 0 ? "In Stock" : "Sold Out"}
                            </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.textGroup}>
                        <h2>Available Colors:</h2>
                        <ul>
                            {shorts.colors.map((color) => (
                            <li key={color}>{color}</li>
                            ))}
                        </ul>
                    </div>

                    {/* <a href={shorts.squareLink} target="_blank" rel="noopener noreferrer">
                    <button className={styles.buyBtn}>Buy Now</button>
                    </a> */}

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