import { PROMO_CODES, SITE } from '@shared/config/site';
import type { CartLine, Pricing } from './types';

export const calculatePricing = (items: CartLine[], promoCode: string | null): Pricing => {
  const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
  const rate = promoCode ? (PROMO_CODES[promoCode]?.rate ?? 0) : 0;
  const discount = Math.round(subtotal * rate);
  const shipping =
    subtotal === 0 || subtotal >= SITE.freeShippingThreshold ? 0 : SITE.shippingFee;
  const freeShippingRemaining = Math.max(0, SITE.freeShippingThreshold - subtotal);

  return {
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
    freeShippingRemaining,
  };
};

export const getCartCount = (items: CartLine[]): number =>
  items.reduce((total, item) => total + item.qty, 0);
