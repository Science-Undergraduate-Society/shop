import { unstable_cache } from 'next/cache'
import { getSquareClient } from './squareClient'
import { products } from '@/data/products'
import type {
  ProductEnriched,
  ClothingEnriched,
  ClothingVariationEnriched,
  SizeVariation,
  AccessoryEnriched,
  AccessoryVariationEnriched
} from '@/lib/types'
import { Size } from '@/lib/types'

// Cache fetched products for 10 minutes
// Revalidate on the 'products' tag
export const getProducts = unstable_cache(
  fetchProducts,
  ['square-products'],
  { revalidate: 600, tags: ['products'] }
)

async function fetchProducts(): Promise<ProductEnriched[]> {
  const client = getSquareClient()

  const squareIds: string[] = []

  // Collect all non-empty item variation Square IDs
  for (const product of products) {
    if (product.type === 'clothing') {
      for (const variation of product.variations) {
        for (const sizeVariation of Object.values(variation.sizes ?? {})) {
          if (sizeVariation?.squareId) {
            squareIds.push(sizeVariation.squareId)
          }
        }
      }
    } else {
      for (const variation of product.variations) {
        if (variation.squareId) {
          squareIds.push(variation.squareId)
        }
      }
    }
  }

  const itemPriceMap = new Map<string, number>()
  const variationPriceMap = new Map<string, number>()
  const variationStockMap = new Map<string, number>()

  if (squareIds.length > 0) {
    // Batch fetch Square catalog (prices live on ITEM_VARIATION objects)
    const catalog = await client.catalog.batchGet({
      objectIds: squareIds
    })

    for (const catalogObject of catalog.objects ?? []) {
      if (catalogObject.type === 'ITEM_VARIATION' && catalogObject.itemVariationData?.priceMoney?.amount != null) {
        const price = catalogObject.itemVariationData.priceMoney.amount

        variationPriceMap.set(catalogObject.id, Number(price) / 100)
      }
    }

    // Derive item price from variation prices (item price = minimum price across all variations)
    for (const product of products) {
      if (!product.squareId) continue

      const variationPrices: number[] = []

      if (product.type === 'clothing') {
        for (const variation of product.variations) {
          for (const sizeVariation of Object.values(variation.sizes ?? {})) {
            if (sizeVariation?.squareId) {
              const price = variationPriceMap.get(sizeVariation.squareId)

              if (price != null) {
                variationPrices.push(price)
              }
            }
          }
        }
      } else {
        for (const variation of product.variations) {
          if (variation.squareId) {
            const price = variationPriceMap.get(variation.squareId)

            if (price != null) {
              variationPrices.push(price)
            }
          }
        }
      }

      if (variationPrices.length > 0) {
        itemPriceMap.set(product.squareId, Math.min(...variationPrices))
      }
    }

    // Batch fetch inventory counts
    const inventory = await client.inventory.batchGetCounts({
      catalogObjectIds: squareIds
    })

    for await (const inventoryObject of inventory) {
      if (inventoryObject.catalogObjectId && inventoryObject.quantity != null) {
        variationStockMap.set(inventoryObject.catalogObjectId, parseFloat(inventoryObject.quantity))
      }
    }
  }

  // Merge product data with Square price and stock data
  return products.map(product => {
    if (product.type === 'clothing') {
      const variationsEnriched: ClothingVariationEnriched[] = product.variations.map(variation => {
        const sizesEnriched: Partial<Record<Size, SizeVariation>> = {}

        for (const [size, sizeVariation] of Object.entries(variation.sizes ?? {}) as [Size, { squareId: string }][]) {
          sizesEnriched[size] = {
            squareId: sizeVariation.squareId,
            price: sizeVariation.squareId ? (variationPriceMap.get(sizeVariation.squareId) ?? null) : null,
            stock: sizeVariation.squareId ? (variationStockMap.get(sizeVariation.squareId) ?? null) : 0
          }
        }

        return { ...variation, sizes: sizesEnriched }
      })

      return {
        ...product,
        price: product.squareId ? (itemPriceMap.get(product.squareId) ?? null) : null,
        variations: variationsEnriched
      } satisfies ClothingEnriched
    } else {
      const variationsEnriched: AccessoryVariationEnriched[] = product.variations.map(variation => ({
        ...variation,
        price: variation.squareId ? (variationPriceMap.get(variation.squareId) ?? null) : null,
        stock: variation.squareId ? (variationStockMap.get(variation.squareId) ?? null) : 0
      }))

      return {
        ...product,
        price: product.squareId ? (itemPriceMap.get(product.squareId) ?? null) : null,
        variations: variationsEnriched
      } satisfies AccessoryEnriched
    }
  })
}
