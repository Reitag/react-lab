import { createContext } from 'react';

export type CartItem = {
  id: number;
  title: string;
};

export interface CartContextConfig {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

export const CartContext = createContext<CartContextConfig | null>(null);
