import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  ids: string[];
  toggle: (id: string) => boolean;
  remove: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (id) => {
        const exists = get().ids.includes(id);
        set((state) => ({
          ids: exists ? state.ids.filter((item) => item !== id) : [id, ...state.ids],
        }));
        return !exists;
      },

      remove: (id) => set((state) => ({ ids: state.ids.filter((item) => item !== id) })),

      has: (id) => get().ids.includes(id),
    }),
    { name: 'layan-wishlist' },
  ),
);

export const useWishlistCount = (): number => useWishlistStore((state) => state.ids.length);
