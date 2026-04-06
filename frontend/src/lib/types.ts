export const Colors = {
  black: '#000000',
  white: '#ffffff',
  grey: 'var(--color-ui-30)',
  greyYellow: 'linear-gradient(135deg, var(--color-ui-30) 70%, #f2ab00 30%)',
  greyWhite: 'linear-gradient(135deg, var(--color-ui-30) 70%, #ffffff 30%)',
  lightBlue: '#d2e9ef',
  darkBlue: '#222755',
  sand: '#e9d7bc',
  pink: '#f1cece'
} as const;

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type Product = Clothing | Accessory

export type ProductEnriched = ClothingEnriched | AccessoryEnriched;

export type Variation = ClothingVariation | AccessoryVariation

export type VariationEnriched = ClothingVariationEnriched | AccessoryVariationEnriched

export interface ProductBase {
  id: string;
  name: string;
  displayName: string;
  squareId: string;
  new?: boolean;
}

// --- Clothing --- //

export interface Clothing extends ProductBase {
  type: 'clothing';
  variations: ClothingVariation[];
}

export interface ClothingVariation {
  color: keyof typeof Colors;
  images: string[];
  sizes: Partial<Record<Size, Pick<SizeVariation, 'squareId'>>>;
}

export interface SizeVariation {
  squareId: string;
  price: number | null;
  stock: number | null;
}

export interface ClothingEnriched extends Omit<Clothing, 'variations'> {
  price: number | null;
  variations: ClothingVariationEnriched[];
}

export interface ClothingVariationEnriched extends Omit<ClothingVariation, 'sizes'> {
  sizes: Partial<Record<Size, SizeVariation>>;
}

// --- Accessory --- //

export interface Accessory extends ProductBase {
  type: 'accessory';
  thumbnail: string;
  variations: Pick<AccessoryVariation, 'id' | 'name' | 'squareId' | 'images'>[];
}

export interface AccessoryVariation {
  id: string;
  name: string;
  squareId: string;
  images: string[];
}

export interface AccessoryEnriched extends Omit<Accessory, 'variations'> {
  price: number | null;
  variations: AccessoryVariationEnriched[];
}

export interface AccessoryVariationEnriched extends AccessoryVariation {
  price: number | null;
  stock: number | null;
}
