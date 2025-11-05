// Product variant representing a specific color/size combination
export interface ProductVariant {
    id: string; // Square variation ID
    name: string; // e.g., "Grey / Small"
    color: string;
    size: string;
    price: number;
    quantity: number; // Available stock
    imageUrl?: string;
}

// Main product from Square Catalog
export interface Product {
    id: string; // Square catalog object ID
    name: string;
    description?: string;
    category: string; // hoodies, crewnecks, etc.
    slug: string;
    images: string[];
    variants: ProductVariant[];
    basePrice: number; // Minimum price across variants
}

// Checkout form data
export interface CheckoutData {
    productId: string;
    variantId: string;
    productName: string;
    variantName: string;
    price: number;
    customerEmail: string;
    customerName: string;
    acknowledgedPickup: boolean;
}

// Order confirmation data
export interface OrderConfirmation {
    orderId: string;
    productName: string;
    variantName: string;
    price: number;
    customerEmail: string;
    customerName: string;
    orderDate: string;
    paymentUrl?: string;
}
