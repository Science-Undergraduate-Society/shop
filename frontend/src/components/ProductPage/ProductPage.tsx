"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCheckout } from "@/components/ProductCheckout/ProductCheckout";
import { Footer } from "@/components/Footer/Footer";
import { Notice } from "@/components/Notice/Notice";

interface ProductPageProps {
  category: string;
  styles: any; // CSS module styles
}

export function ProductPage({ category, styles }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${category}`);
        const data = await response.json();

        if (!data.success || !data.products || data.products.length === 0) {
          setError("Product not found");
          return;
        }

        const prod = data.products[0]; // Get first product for this category
        setProduct(prod);
        setSelectedImage(prod.images[0] || "");
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [category]);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <nav className={styles.navbar}>
          <Link href="/" className={styles.backLink}>
            ← Back to Shop
          </Link>
        </nav>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.pageWrapper}>
        <nav className={styles.navbar}>
          <Link href="/" className={styles.backLink}>
            ← Back to Shop
          </Link>
        </nav>
        <div className={styles.error}>{error || "Product not found"}</div>
      </div>
    );
  }

  // Group variants by color and size for display
  const colors = Array.from(new Set(product.variants.map((v) => v.color)));
  const sizes = Array.from(new Set(product.variants.map((v) => v.size)));

  return (
    <div className={styles.pageWrapper}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.backLink}>
          ← Back to Shop
        </Link>
      </nav>

      <Notice />

      <div className={styles.pageLayout}>
        <div className={styles.content}>
          {/* Left Panel: Thumbnails + Main Image */}
          <div className={styles.leftPanel}>
            {product.images.length > 1 && (
              <div className={styles.thumbnailColumn}>
                {product.images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`${product.name} ${index}`}
                    className={`${styles.thumbnail} ${
                      selectedImage === src ? styles.active : ""
                    }`}
                    onClick={() => setSelectedImage(src)}
                  />
                ))}
              </div>
            )}
            <div className={styles.mainImage}>
              <img src={selectedImage} alt={product.name} />
            </div>
          </div>

          {/* Right Panel: Info */}
          <div className={styles.rightPanel}>
            <h1 className={styles.name}>{product.name}</h1>
            {product.description && (
              <p className={styles.description}>{product.description}</p>
            )}
            <p className={styles.price}>
              From ${product.basePrice.toFixed(2)} CAD
            </p>

            <div className={styles.textGroup}>
              <h2>Available Colors:</h2>
              <ul>
                {colors.map((color) => {
                  const colorVariants = product.variants.filter(
                    (v) => v.color === color
                  );
                  const totalStock = colorVariants.reduce(
                    (sum, v) => sum + v.quantity,
                    0
                  );
                  return (
                    <li key={color}>
                      {color} — {totalStock > 0 ? "In Stock" : "Sold Out"}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.textGroup}>
              <h2>Available Sizes:</h2>
              <ul>
                {sizes.map((size) => {
                  const sizeVariants = product.variants.filter(
                    (v) => v.size === size
                  );
                  const totalStock = sizeVariants.reduce(
                    (sum, v) => sum + v.quantity,
                    0
                  );
                  return (
                    <li key={size}>
                      {size} — {totalStock > 0 ? "In Stock" : "Sold Out"}
                    </li>
                  );
                })}
              </ul>
            </div>

            <p className={styles.taxes}>✅ Taxes Included</p>

            {/* Checkout Section */}
            <div className={styles.checkoutSection}>
              <h2>Purchase This Item</h2>
              <ProductCheckout
                productId={product.id}
                productName={product.name}
                variants={product.variants}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
