"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./quarterZips.module.css";

import { Footer } from "@/components/Footer/Footer";
import { Notice } from "@/components/Notice/Notice";

export default function QuarterZips() {
    const quarterzip = {
        name: "Our Brand New Quarter Zips!",
        price: 50,
        colors: ["Navy Blue"],
        sizes: { S: 0, M: 0, L: 10, XL: 5 },
        images: [
            "/merch_photos/quarter_zips/quarter1.JPG",
            "/merch_photos/quarter_zips/quarter2.JPG",
            "/merch_photos/quarter_zips/quarter3.JPG",
        ],
        squareLink: "",
    };

    const [selectedImage, setSelectedImage] = useState(quarterzip.images[0]);

    return (
            <div className={styles.pageWrapper}>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.backLink}>← Back to Shop</Link>
            </nav>

            <Notice />

            <div className={styles.pageLayout}>
                <div className={styles.content}>
                {/* Left Panel: Thumbnails + Main Image */}
                <div className={styles.leftPanel}>
                    <div className={styles.thumbnailColumn}>
                        {quarterzip.images.map((src, index) => (
                            <img
                            key={index}
                            src={src}
                            alt={`quarterzip ${index}`}
                            className={`${styles.thumbnail} ${selectedImage === src ? styles.active : ""}`}
                            onClick={() => setSelectedImage(src)}
                            />
                        ))}
                    </div>
                        <div className={styles.mainImage}>
                        <img src={selectedImage} alt="Main Quarter-Zip" />
                    </div>
                </div>

                {/* Right Panel: Info */}
                <div className={styles.rightPanel}>
                    <h1 className={styles.name}>{quarterzip.name}</h1>
                    <p className={styles.price}>${quarterzip.price}.00 CAD</p>

                    <div className={styles.textGroup}>
                        <h2>Available Sizes:</h2>
                            <ul>
                                {Object.entries(quarterzip.sizes).map(([size, qty]) => (
                                <li key={size}>
                                    {size} — {qty > 0 ? "In Stock" : "Sold Out"}
                                </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.textGroup}>
                            <h2>Available Colors:</h2>
                            <ul>
                                {quarterzip.colors.map((color) => (
                                <li key={color}>{color}</li>
                                ))}
                            </ul>
                        </div>

                        {/* <a href={crewneck.squareLink} target="_blank" rel="noopener noreferrer">
                        <button className={styles.buyBtn}>Buy Now</button>
                        </a> */}

                        <p className={styles.taxes}>✅ Taxes Included</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
