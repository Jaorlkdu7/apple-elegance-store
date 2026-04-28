import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
  color?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, color?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, color) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1, color }] };
        }),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      updateQuantity: (id, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === id ? { ...i, quantity: Math.max(1, qty) } : i
          ),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "iphones-premium-cart" }
  )
);
