import { CartContext, CartContextConfig, CartItem } from '@/context/CartContext';
import { useState } from 'react';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems([...items, item]);
  };

  const removeFromCart = (id: number) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const contextValue: CartContextConfig = {
    items,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
