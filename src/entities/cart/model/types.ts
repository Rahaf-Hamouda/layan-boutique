export interface CartLine {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  size?: string;
  qty: number;
}

export type PromoResult = 'applied' | 'invalid' | 'exists';

export interface Pricing {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingRemaining: number;
}
