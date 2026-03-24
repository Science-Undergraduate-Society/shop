import type {
  ProductEnriched,
  VariationEnriched,
  ClothingEnriched,
  ClothingVariationEnriched,
  AccessoryEnriched,
  AccessoryVariationEnriched,
} from '@/lib/types'
import { Size } from '@/lib/types'
import ClothingDetails from './ClothingDetails'
import AccessoryDetails from './AccessoryDetails'

export default function ProductDetails({
  product,
  variation,
  size,
  onVariationChange,
  onSizeChange
}: {
  product: ProductEnriched
  variation: VariationEnriched
  size: Size | null
  onVariationChange: (variation: VariationEnriched) => void
  onSizeChange: (size: Size) => void
}) {
  if (product.type === 'clothing') {
    return (
      <ClothingDetails
        product={product as ClothingEnriched}
        variation={variation as ClothingVariationEnriched}
        size={size}
        onVariationChange={onVariationChange}
        onSizeChange={onSizeChange}
      />
    )
  }

  if (product.type === 'accessory') {
    return (
      <AccessoryDetails
        product={product as AccessoryEnriched}
        variation={variation as AccessoryVariationEnriched}
        onVariationChange={onVariationChange}
      />
    )
  }

  return null
}
