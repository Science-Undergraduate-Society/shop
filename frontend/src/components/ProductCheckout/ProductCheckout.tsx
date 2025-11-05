"use client";

import { useState } from "react";
import { ProductVariant } from "@/lib/types";
import styles from "./ProductCheckout.module.css";

interface ProductCheckoutProps {
  productId: string;
  productName: string;
  variants: ProductVariant[];
  onCheckoutComplete?: () => void;
}

export function ProductCheckout({
  productId,
  productName,
  variants,
  onCheckoutComplete,
}: ProductCheckoutProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [acknowledgedPickup, setAcknowledgedPickup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Group variants by size and color for selection
  const colors = Array.from(new Set(variants.map((v) => v.color)));
  const sizes = Array.from(new Set(variants.map((v) => v.size)));

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  // Update selected variant when color/size changes
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updateSelectedVariant(color, selectedSize);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    updateSelectedVariant(selectedColor, size);
  };

  const updateSelectedVariant = (color: string, size: string) => {
    if (color && size) {
      const variant = variants.find(
        (v) => v.color === color && v.size === size
      );
      setSelectedVariant(variant || null);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!selectedVariant) {
      setError("Please select a color and size");
      return;
    }

    if (!customerName.trim() || !customerEmail.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!acknowledgedPickup) {
      setError("You must acknowledge the pickup-only policy");
      return;
    }

    if (selectedVariant.quantity <= 0) {
      setError("This item is currently out of stock");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          variantId: selectedVariant.id,
          productName,
          variantName: selectedVariant.name,
          price: selectedVariant.price,
          customerEmail,
          customerName,
          acknowledgedPickup,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create checkout");
      }

      // Redirect to payment URL
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("No payment URL received");
      }

      if (onCheckoutComplete) {
        onCheckoutComplete();
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to process checkout"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <form onSubmit={handleCheckout} className={styles.form}>
        {/* Color Selection */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Select Color *</label>
          <div className={styles.optionGrid}>
            {colors.map((color) => {
              const colorVariants = variants.filter((v) => v.color === color);
              const hasStock = colorVariants.some((v) => v.quantity > 0);
              
              return (
                <button
                  key={color}
                  type="button"
                  className={`${styles.optionButton} ${
                    selectedColor === color ? styles.selected : ""
                  } ${!hasStock ? styles.disabled : ""}`}
                  onClick={() => handleColorChange(color)}
                  disabled={!hasStock}
                >
                  {color}
                  {!hasStock && <span className={styles.soldOut}> (Sold Out)</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selection */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Select Size *</label>
          <div className={styles.optionGrid}>
            {sizes.map((size) => {
              const variant = variants.find(
                (v) => v.color === selectedColor && v.size === size
              );
              const hasStock = variant && variant.quantity > 0;
              
              return (
                <button
                  key={size}
                  type="button"
                  className={`${styles.optionButton} ${
                    selectedSize === size ? styles.selected : ""
                  } ${!hasStock || !selectedColor ? styles.disabled : ""}`}
                  onClick={() => handleSizeChange(size)}
                  disabled={!hasStock || !selectedColor}
                >
                  {size}
                  {selectedColor && variant && variant.quantity === 0 && (
                    <span className={styles.soldOut}> (Sold Out)</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stock Info */}
        {selectedVariant && (
          <div className={styles.stockInfo}>
            <p className={selectedVariant.quantity > 0 ? styles.inStock : styles.outOfStock}>
              {selectedVariant.quantity > 0 
                ? `✅ In Stock (${selectedVariant.quantity} available)` 
                : '❌ Out of Stock'}
            </p>
            <p className={styles.price}>
              Price: ${selectedVariant.price.toFixed(2)} CAD (taxes included)
            </p>
          </div>
        )}

        {/* Customer Information */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="customerName">
            Your Name *
          </label>
          <input
            id="customerName"
            type="text"
            className={styles.input}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="customerEmail">
            Your Email *
          </label>
          <input
            id="customerEmail"
            type="email"
            className={styles.input}
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>

        {/* Pickup Notice */}
        <div className={styles.pickupNotice}>
          <h3>⚠️ IMPORTANT: Pickup Only</h3>
          <p>
            This is a <strong>pickup-only</strong> order. We do not ship items.
          </p>
          <p>
            After payment, you will receive an email with a link to book your pickup time.
          </p>
          <p>
            <strong>Pickup Location:</strong> SUS Office, Life Sciences Centre, Room 2242
          </p>
          
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={acknowledgedPickup}
              onChange={(e) => setAcknowledgedPickup(e.target.checked)}
              required
            />
            <span>I understand this is pickup only and will book a pickup time</span>
          </label>
        </div>

        {/* Error Message */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={
            isLoading ||
            !selectedVariant ||
            !customerName ||
            !customerEmail ||
            !acknowledgedPickup ||
            selectedVariant.quantity <= 0
          }
        >
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}
