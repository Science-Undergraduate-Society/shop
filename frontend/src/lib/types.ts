export const Colors = {
  black: '#000000',
  white: '#ffffff',
  grey: '#d9d9d9',
  greyYellow: 'linear-gradient(135deg, #d9d9d9 70%, #f2ab00 30%)',
  greyWhite: 'linear-gradient(135deg, #d9d9d9 70%, #ffffff 30%)',
  lightBlue: '#d2e9ef',
  darkBlue: '#222755',
  sand: '#e9d7bc',
  pink: '#f1cece'
} as const;

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type Product = Clothing | Accessory

export type Variant = ClothingVariant | AccessoryVariant

export interface BaseProduct {
  id: string;
  name: string;
  displayName: string;
  squareLink: string;
  new?: boolean;
}

export interface Clothing extends BaseProduct {
  type: 'clothing';
  variants: ClothingVariant[];
}

export interface Accessory extends BaseProduct {
  type: 'accessory';
  thumbnail: string;
  variants: AccessoryVariant[];
}

export interface ClothingVariant {
  color: keyof typeof Colors
  price: number;
  images: string[];
  sizes: Partial<Record<Size, boolean>>; // True if in stock
}

export interface AccessoryVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  images: string[];
}
