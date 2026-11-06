import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PROMO_CODES } from '@shared/config/site';
import type { CartLine, PromoResult } from './types';

interface CartStore {
  items: CartLine[];
  isOpen: boolean;
  promoCode: string | null;
  add: (line: Omit<CartLine, 'key' | 'qty'>, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  applyPromo: (code: string) => PromoResult;
  removePromo: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const buildKey = (productId: string, size?: string): string =>
  size ? `${productId}::${size}` : productId;

const MAX_QTY = 10;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: null,

      add: (line, qty = 1) =>
        set((state) => {
          const key = buildKey(line.productId, line.size);
          const existing = state.items.find((item) => item.key === key);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.key === key ? { ...item, qty: Math.min(MAX_QTY, item.qty + qty) } : item,
              ),
            };
          }

          return {
            items: [...state.items, { ...line, key, qty: Math.min(MAX_QTY, qty) }],
          };
        }),

      remove: (key) =>
        set((state) => ({ items: state.items.filter((item) => item.key !== key) })),

      setQty: (key, qty) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key ? { ...item, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : item,
          ),
        })),

      clear: () => set({ items: [], promoCode: null }),

      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();
        if (!PROMO_CODES[normalized]) return 'invalid';
        if (get().promoCode === normalized) return 'exists';
        set({ promoCode: normalized });
        return 'applied';
      },

      removePromo: () => set({ promoCode: null }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'layan-cart',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        isOpen: false,
      }),
    },
  ),
);

export const useCartCount = (): number =>
  useCartStore((state) => state.items.reduce((total, item) => total + item.qty, 0));
