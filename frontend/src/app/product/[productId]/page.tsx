"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./product.module.css";

import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { Notice } from "@/components/Notice/Notice";
import productsData from "@/data/products.json";

interface Variant {
    id: string;
    name: string;
    price: number;
    stock: number;
    squareLink: string;
}

interface Product {
    id: string;
    name: string;
    fullName: string;
    price: number;
    image: string;
    images: string[];
    priceNote?: string;
    variants: Variant[];
}

export default function ProductPage() {
    const params = useParams();
    const productId = params.productId as string;
    
    const product = productsData.find(p => p.id === productId) as Product | undefined;
    
    const [selectedImage, setSelectedImage] = useState(product?.images[0] || "");
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
        product?.variants[0] || null
    );

    if (!product) {
        return (
            <div className={styles.pageWrapper}>
                <nav className={styles.navbar}>
                    <Link href="/" className={styles.backLink}>← Back to Shop</Link>
                </nav>
                <div className={styles.pageLayout}>
                    <h1>Product not found</h1>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <Navbar />

            <div className={styles.pageLayout}>
                <div className={styles.content}>
                    
                    <Notice />

                    {/* Left Panel: Thumbnails + Main Image */}
                    <div className={styles.leftPanel}>
                        <div className={styles.thumbnailColumn}>
                            {product.images.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`${product.fullName} ${index}`}
                                    className={`${styles.thumbnail} ${selectedImage === src ? styles.active : ""}`}
                                    onClick={() => setSelectedImage(src)}
                                />
                            ))}
                        </div>
                        <div className={styles.mainImage}>
                            <img src={selectedImage} alt={`Main ${product.fullName}`} />
                        </div>
                    </div>

                    {/* Right Panel: Info */}
                    <div className={styles.rightPanel}>
                        <h1 className={styles.name}>{product.fullName}</h1>
                        
                        {selectedVariant && (
                            <p className={styles.price}>${selectedVariant.price.toFixed(2)} CAD</p>
                        )}

                        {/* Variant Selection */}
                        {product.variants && product.variants.length > 1 && (
                            <div className={styles.textGroup}>
                                <h2>Select Style:</h2>
                                <div className={styles.variantGrid}>
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            className={`${styles.variantButton} ${
                                                selectedVariant?.id === variant.id ? styles.activeVariant : ""
                                            } ${variant.stock === 0 ? styles.soldOut : ""}`}
                                            onClick={() => setSelectedVariant(variant)}
                                            disabled={variant.stock === 0}
                                        >
                                            <span className={styles.variantName}>{variant.name}</span>
                                            <span className={styles.variantPrice}>
                                                ${variant.price.toFixed(2)}
                                            </span>
                                            {variant.stock === 0 && (
                                                <span className={styles.soldOutBadge}>Sold Out</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedVariant && selectedVariant.stock > 0 && (
                            <p className={styles.stockInfo}>
                                {selectedVariant.stock} in stock
                            </p>
                        )}

                        {selectedVariant?.squareLink && (
                            <a href={selectedVariant.squareLink} target="_blank" rel="noopener noreferrer">
                                <button className={styles.buyBtn}>Buy Now</button>
                            </a>
                        )}

                        <p className={styles.taxes}>✅ Taxes Included</p>

                        {product.priceNote && (
                            <>
                                <br/>
                                <p><strong>Note:</strong> {product.priceNote}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.footer_container}></div>
            <Footer />
        </div>
    );
}
