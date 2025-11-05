import { SquareClient } from 'square';
import { Product, ProductVariant } from './types';

// Initialize Square client
const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment: process.env.SQUARE_ENVIRONMENT === 'production' 
    ? 'production' 
    : 'sandbox',
});

export const squareClient = client;

/**
 * Fetch all products from Square Catalog
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await client.catalog.list({
      types: 'ITEM',
    });

    const items = [];
    for await (const item of response) {
      items.push(item);
    }

    if (!items || items.length === 0) {
      return [];
    }

    const products: Product[] = [];

    for (const item of items) {
      const product = await mapSquareItemToProduct(item);
      if (product) {
        products.push(product);
      }
    }

    return products;
  } catch (error) {
    console.error('Error fetching products from Square:', error);
    throw new Error('Failed to fetch products from Square');
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const allProducts = await getAllProducts();
  return allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const response = await client.catalog.object.retrieve(productId, {
      includeRelatedObjects: true,
    });
    
    if (!response || !response.object || !response.object.itemData) {
      return null;
    }

    return await mapSquareItemToProduct(response.object, response.relatedObjects);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

/**
 * Map Square catalog item to our Product type
 */
async function mapSquareItemToProduct(
  item: any,
  relatedObjects?: any[]
): Promise<Product | null> {
  const itemData = item.itemData;
  if (!itemData) return null;

  // Determine category from item name or custom attributes
  const category = determineCategory(itemData.name);
  const slug = category.toLowerCase().replace(/\s+/g, '-');

  // Get images
  const images: string[] = [];
  if (itemData.imageIds && itemData.imageIds.length > 0) {
    for (const imageId of itemData.imageIds) {
      const imageObj = relatedObjects?.find(obj => obj.id === imageId);
      if (imageObj?.imageData?.url) {
        images.push(imageObj.imageData.url);
      }
    }
  }

  // Get variants with inventory
  const variants: ProductVariant[] = [];
  let basePrice = 0;

  if (itemData.variations && itemData.variations.length > 0) {
    for (const variation of itemData.variations) {
      const variantData = variation.itemVariationData;
      if (!variantData) continue;

      const price = variantData.priceMoney 
        ? Number(variantData.priceMoney.amount) / 100 
        : 0;

      if (basePrice === 0 || price < basePrice) {
        basePrice = price;
      }

      // Extract color and size from variation name
      const { color, size } = parseVariationName(variantData.name);

      // Get inventory count
      const quantity = await getInventoryCount(variation.id);

      variants.push({
        id: variation.id,
        name: variantData.name,
        color,
        size,
        price,
        quantity,
      });
    }
  }

  return {
    id: item.id,
    name: itemData.name,
    description: itemData.description,
    category,
    slug,
    images,
    variants,
    basePrice,
  };
}

/**
 * Get inventory count for a specific variation
 */
async function getInventoryCount(variationId: string): Promise<number> {
  try {
    const response = await client.inventory.retrieve(variationId, {
      locationIds: process.env.SQUARE_LOCATION_ID,
    });
    
    if (response.counts && response.counts.length > 0) {
      const count = response.counts.find((c: any) => c.state === 'IN_STOCK');
      return count?.quantity ? parseFloat(count.quantity) : 0;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error fetching inventory for ${variationId}:`, error);
    return 0;
  }
}

/**
 * Parse variation name to extract color and size
 * Expects format like "Grey / Small" or "Navy Blue - M"
 */
function parseVariationName(name: string): { color: string; size: string } {
  // Try different separators
  const separators = ['/', '-', '|'];
  
  for (const sep of separators) {
    if (name.includes(sep)) {
      const parts = name.split(sep).map(p => p.trim());
      if (parts.length >= 2) {
        return {
          color: parts[0],
          size: parts[1],
        };
      }
    }
  }

  // If no separator found, try to extract size from common patterns
  const sizeMatch = name.match(/\b(XS|S|M|L|XL|XXL|2XL|3XL)\b/i);
  if (sizeMatch) {
    const size = sizeMatch[0].toUpperCase();
    const color = name.replace(sizeMatch[0], '').trim();
    return { color, size };
  }

  // Fallback
  return { color: name, size: 'One Size' };
}

/**
 * Determine category from product name
 */
function determineCategory(name: string): string {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('hoodie')) return 'hoodies';
  if (nameLower.includes('crewneck')) return 'crewnecks';
  if (nameLower.includes('letterman') || nameLower.includes('jacket')) return 'letterman';
  if (nameLower.includes('quarter') && nameLower.includes('zip')) return 'quarterZips';
  if (nameLower.includes('short')) return 'shorts';
  
  return 'other';
}

/**
 * Create a payment link for a specific variation
 */
export async function createPaymentLink(
  variantId: string,
  quantity: number = 1
): Promise<string> {
  try {
    const response = await client.checkout.createPaymentLink({
      idempotencyKey: `${variantId}-${Date.now()}`,
      order: {
        locationId: process.env.SQUARE_LOCATION_ID!,
        lineItems: [
          {
            catalogObjectId: variantId,
            quantity: quantity.toString(),
          },
        ],
      },
      checkoutOptions: {
        allowTipping: false,
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/orderCompleted`,
      },
    });

    return response.paymentLink?.url || '';
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw new Error('Failed to create payment link');
  }
}

/**
 * Batch get inventory counts for multiple variations
 */
export async function batchGetInventory(variationIds: string[]): Promise<Map<string, number>> {
  const inventoryMap = new Map<string, number>();

  try {
    const response = await client.inventory.batchRetrieve({
      catalogObjectIds: variationIds,
      locationIds: [process.env.SQUARE_LOCATION_ID!],
    });

    if (response.counts) {
      for (const count of response.counts) {
        if (count.catalogObjectId && count.state === 'IN_STOCK') {
          inventoryMap.set(
            count.catalogObjectId,
            count.quantity ? parseFloat(count.quantity) : 0
          );
        }
      }
    }
  } catch (error) {
    console.error('Error batch fetching inventory:', error);
  }

  return inventoryMap;
}
