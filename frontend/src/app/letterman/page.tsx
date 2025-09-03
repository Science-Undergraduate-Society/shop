"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./letterman.module.css";

import { Footer } from "@/components/Footer/Footer";

export default function QuarterZips() {
    const letterman = {
        name: "Our Brand New Letterman Jackets!",
        price: 50,
        colors: ["Navy Blue"],
        sizes: { S: 3, M: 18, L: 25, XL: 7 },
        images: [
            "/merch_photos/letterman/letterman1.JPG",
            "/merch_photos/letterman/letterman2.JPG",
            "/merch_photos/letterman/letterman3.JPG",
            "/merch_photos/letterman/letterman4.JPG",
            "/merch_photos/letterman/letterman5.JPG",
        ],
        squareLink: "",
    };

    const [selectedImage, setSelectedImage] = useState(letterman.images[0]);

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
                        {letterman.images.map((src, index) => (
                            <img
                            key={index}
                            src={src}
                            alt={`letterman ${index}`}
                            className={`${styles.thumbnail} ${selectedImage === src ? styles.active : ""}`}
                            onClick={() => setSelectedImage(src)}
                            />
                        ))}
                    </div>
                        <div className={styles.mainImage}>
                        <img src={selectedImage} alt="Main Letterman" />
                    </div>
                </div>

                {/* Right Panel: Info */}
                <div className={styles.rightPanel}>
                    <h1 className={styles.name}>{letterman.name}</h1>
                    <p className={styles.price}>${letterman.price}.00 CAD</p>

                    <div className={styles.textGroup}>
                        <h2>Available Sizes:</h2>
                            <ul>
                                {Object.entries(letterman.sizes).map(([size, qty]) => (
                                <li key={size}>
                                    {size} — {qty > 0 ? "In Stock" : "Sold Out"}
                                </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.textGroup}>
                            <h2>Available Colors:</h2>
                            <ul>
                                {letterman.colors.map((color) => (
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
